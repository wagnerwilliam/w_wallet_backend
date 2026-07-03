import bcrypt from "bcrypt";
/**
 * Expresiones regulares utilizadas para validar campos de ingresos.
 */

export class AuthValidations {
  comparePassword = async (password, hashedPassword) => {
    const errors = {};
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (!isValid) {
      errors.password = ["Usuario o contraseña incorrectos"];
    }

    return {
      status: 401,
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
}
