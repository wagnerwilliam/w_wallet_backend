/**
 * Expresiones regulares utilizadas para validar campos de ingresos.
 */

const OBJECT_ID_REGEX = /^[0-9a-f]{24}$/;
const NAME_REGEX = /^[0-9a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const NUMBER_REGEX = /^\d+(\.\d+)?$/;

/**
 * Clase encargada de validar datos relacionados con ingresos.
 *
 * Responsabilidad:
 * - Validar creación de ingresos
 * - Validar actualización parcial (PATCH)
 * - Validar eliminación por ID
 * - Validar formatos de ObjectId, texto y números
 *
 * Esta capa evita que datos inválidos lleguen a la base de datos.
 */

export class IngresosValidations {
  validateObjectId = (id, errors) => {
    if (!id || !OBJECT_ID_REGEX.test(id)) {
      errors.id = ["ID inválido"];
    }
  };

  validateUpdateData(id, data) {
    const { name, value, category_id } = data;
    const errors = {};

    this.validateObjectId(id, errors);

    if (name !== undefined) {
      if (!NAME_REGEX.test(name.trim())) {
        errors.name = [
          "El campo name debe contener solo letras, números y espacios",
        ];
      }
    }

    if (value !== undefined) {
      if (value === null || value === "") {
        errors.value = ["El campo value es obligatorio"];
      } else if (!NUMBER_REGEX.test(String(value))) {
        errors.value = ["El campo value debe ser un número positivo válido"];
      }
    }

    if (category_id !== undefined) {
      if (!OBJECT_ID_REGEX.test(category_id)) {
        errors.category_id = [
          "El campo category_id es obligatorio y debe ser un Id válido",
        ];
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors: Object.keys(errors).length ? errors : null,
    };
  }

  validateCreateData(data) {
    //Pendiente por validar created at
    const { name, value, category_id } = data;
    const errors = {};

    if (!name || !NAME_REGEX.test(name.trim())) {
      errors.name = [
        "El campo name es obligatorio y solo puede contener letras, números y espacios",
      ];
    }

    if (value === undefined || value === null || value === "") {
      errors.value = ["El campo value es obligatorio"];
    } else if (!NUMBER_REGEX.test(String(value))) {
      errors.value = ["El campo value debe ser un número positivo válido"];
    }

    if (!category_id || !OBJECT_ID_REGEX.test(category_id)) {
      errors.category_id = [
        "El campo category_id es obligatorio y debe ser un Id válido",
      ];
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  validateDeleteData(id) {
    const errors = {};

    this.validateObjectId(id, errors);

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
