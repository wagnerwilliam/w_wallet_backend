/**
 * Helper que valida el resultado de una validación
 * y lanza un error controlado si los datos no son válidos.
 *
 * Se usa para centralizar el manejo de errores de validación
 * en controllers.
 */

export const validateOrThrow = (validation) => {
  if (validation.isValid) return;

  const error = new Error("Errores de validación en el formulario");
  error.status = 400;
  error.details = validation.errors;
  throw error;
};
