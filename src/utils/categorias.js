// categorias por defecto para cundo cada usuario se registre:

// Ingresos
// | Nombre            | Descripción                                        |
// | ----------------- | -------------------------------------------------- |
// | 💼 Trabajo        | Salario, nómina, honorarios, pagos por servicios.  |
// | 💰 Ventas         | Venta de productos o servicios.                    |
// | 📈 Inversiones    | Dividendos, intereses, rentabilidad.               |
// | 🎁 Regalos        | Dinero recibido de familiares o amigos.            |
// | 📦 Otros ingresos | Cualquier ingreso que no encaje en las anteriores. |

// Gastos
// | Nombre          | Descripción                                     |
// | --------------- | ----------------------------------------------- |
// | 🛒 Alimentación | Supermercado, restaurantes, comida.             |
// | 🏠 Vivienda     | Alquiler, hipoteca, servicios del hogar.        |
// | 🚗 Transporte   | Combustible, transporte público, mantenimiento. |
// | 🎬 Ocio         | Streaming, cine, viajes, entretenimiento.       |
// | 📦 Otros gastos | Gastos ocasionales o sin categoría específica.  |


export const defaultCategorias = [
  // INGRESOS
  {
    name: "Trabajo",
    type: "ingreso",
    color: "#10B981", // Emerald
  },
  {
    name: "Ventas",
    type: "ingreso",
    color: "#14B8A6", // Teal
  },
  {
    name: "Inversiones",
    type: "ingreso",
    color: "#3B82F6", // Blue
  },
  {
    name: "Regalos",
    type: "ingreso",
    color: "#8B5CF6", // Violet
  },
  {
    name: "Otros ingresos",
    type: "ingreso",
    color: "#22C55E", // Green
  },

  // GASTOS
  {
    name: "Alimentación",
    type: "gasto",
    color: "#F97316", // Orange
  },
  {
    name: "Vivienda",
    type: "gasto",
    color: "#EF4444", // Red
  },
  {
    name: "Transporte",
    type: "gasto",
    color: "#EAB308", // Yellow
  },
  {
    name: "Ocio",
    type: "gasto",
    color: "#EC4899", // Pink
  },
  {
    name: "Otros gastos",
    type: "gasto",
    color: "#6B7280", // Gray
  },
];
