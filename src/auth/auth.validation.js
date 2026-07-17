import bcrypt from "bcrypt";

/**
 * Clase encargada de las validaciones relacionadas con la autenticación.
 *
 * Centraliza las comprobaciones necesarias durante el proceso de inicio
 * de sesión, como la verificación de credenciales y otras validaciones
 * específicas del flujo de autenticación.
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
