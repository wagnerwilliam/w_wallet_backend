import bcrypt from "bcrypt";
/**
 * Expresiones regulares utilizadas para validar campos de ingresos.
 */

export class AuthValidations {
  comparePassword = async (password, usuario) => {
    const errors = {};
    const isValid = await bcrypt.compare(password, usuario.password);

    if (!isValid) {
      errors.auth = ["Usuario o contraseña incorrectos"];
    }

    return {
      status: 401,
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
}
