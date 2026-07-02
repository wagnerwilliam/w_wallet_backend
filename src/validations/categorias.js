const OBJECT_ID_REGEX = /^[0-9a-f]{24}$/;
const NAME_REGEX = /^[0-9a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const TYPE_REGEX = /^(ingreso|gasto)$/;
const HEX_COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

/**
 * Clase encargada de validar datos relacionados con Categorías.
 *
 * Responsabilidades:
 * - Validar ObjectId de MongoDB
 * - Validar creación de categorías
 * - Validar actualización parcial (PATCH)
 * - Validar eliminación por ID
 *
 * Esta capa evita que datos inválidos lleguen al service o a la base de datos.
 */

export class CategoriasValidations {
  validateObjectId = (id, errors) => {
    if (!id || !OBJECT_ID_REGEX.test(id)) {
      errors.id = ["ID inválido"];
    }
  };

  validateUpdateData(id, data) {
    const { name, type, is_active, color } = data;
    const errors = {};

    this.validateObjectId(id, errors);

    if (name !== undefined) {
      if (!NAME_REGEX.test(name.trim())) {
        errors.name = [
          "El campo name debe contener solo letras, números y espacios",
        ];
      }
    }

    if (type !== undefined) {
      if (!TYPE_REGEX.test(type)) {
        errors.type = ["El campo type debe ser 'ingreso' o 'gasto'"];
      }
    }

    if (is_active !== undefined && typeof is_active !== "boolean") {
      errors.is_active = [
        "El campo is_active debe ser un valor booleano (true o false)",
      ];
    }

    if (color !== undefined) {
      if (!HEX_COLOR_REGEX.test(color)) {
        errors.color = ["El campo color debe ser hexadecimal (ej: #FBD341)"];
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors: Object.keys(errors).length ? errors : null,
    };
  }

  validateCreateData(data) {
    const { name, type, color, is_active } = data;
    const errors = {};

    if (!name || !NAME_REGEX.test(name.trim())) {
      errors.name = [
        "El campo name es obligatorio y solo puede contener letras, números y espacios",
      ];
    }

    if (!type || !TYPE_REGEX.test(type)) {
      errors.type = [
        "El campo type es obligatorio y debe ser 'ingreso' o 'gasto'",
      ];
    }

    if (is_active !== undefined && typeof is_active !== "boolean") {
      errors.is_active = [
        "El campo is_active debe ser un valor booleano (true o false)",
      ];
    }

    if (color && !HEX_COLOR_REGEX.test(color)) {
      errors.color = ["El campo color debe ser hexadecimal (ej: #FBD341)"];
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
