export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Datos inválidos",
      detalles: result.error.flatten().fieldErrors,
    });
  }

  // Sobrescribimos el body con los datos limpios y validados por Zod
  req.body = result.data;
  next();
};
