/**
 * Expresiones regulares utilizadas para validar campos de ingresos.
 */

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,30}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export class UsuariosValidations {
  validateObjectId = (id, errors) => {
    if (!id || !OBJECT_ID_REGEX.test(id)) {
      errors.id = ["ID inválido"];
    }
  };

  validateUpdateData(id, data) {}

  validateCreateData({ username, email, password }) {
    const errors = {};

    if (!username || !USERNAME_REGEX.test(username.trim())) {
      errors.username = [
        "El campo username es obligatorio y solo puede contener letras, números y espacios",
      ];
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      errors.email = ["El correo electrónico no es válido."];
    }

    if (!password || !PASSWORD_REGEX.test(password)) {
      errors.password = [
        "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número.",
      ];
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  validateUniqueFields({ username, email }) {
    const errors = {};

    if (username) {
      errors.username = ["Username ya registrado"];
    }

    if (email) {
      errors.email = ["Email ya registrado"];
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
