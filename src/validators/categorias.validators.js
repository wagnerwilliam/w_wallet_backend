export const crearCategoriaValidation = (data) => {
  let { name, type, color, user_id } = data;
  const errors = {};
  console.log(data);

  const nameRegex = /^[0-9a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!name || !nameRegex.test(name.trim())) {
    errors.name = [
      "El nombre es obligatorio y solo puede contener letras, números o espacios",
    ];
  }

  const typeRegex = /^(ingreso|gasto)$/;
  if (!type || !typeRegex.test(type)) {
    errors.type = ["El tipo debe ser estrictamente 'ingreso' o 'gasto'"];
  }

  const userIdRegex = /^[0-9a-zA-Z]+$/;
  if (!user_id || !userIdRegex.test(user_id)) {
    errors.user_id = [
      "El user_id es obligatorio y debe ser un formato alfanumérico válido",
    ];
  }

  // 4. Validar COLOR: Hexadecimal de 6 dígitos con '#' (Opcional)
  if (color !== undefined && color !== null && color !== "") {
    const hexColorRegex = /^#[0-9a-fA-F]{6}$/;
    if (!hexColorRegex.test(color)) {
      errors.color = [
        "El color debe ser un formato hexadecimal válido (ej: #fbd341)",
      ];
    }
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors: isValid ? null : errors,
  };
};
