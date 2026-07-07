export const getDateRange = (period) => {
  const now = new Date();

  let from;
  let to;

  switch (period) {
    case "today":
      from = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      to = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      break;

    case "week":
      from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
      from.setHours(0, 0, 0, 0);

      to = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      break;

    case "month":
      from = new Date(now.getFullYear(), now.getMonth(), 1);

      to = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      break;

    case "year":
      from = new Date(now.getFullYear(), 0, 1);

      to = new Date(now.getFullYear() + 1, 0, 1);
      break;

    default:
      throw new Error("Periodo inválido");
  }

  return { from, to };
};

export const round = (value) => Math.round(value * 100) / 100;

export const getTotal = async (Model, user_id, from, to) => {
  const result = await Model.aggregate([
    {
      $match: {
        user_id,
        created_at: {
          $gte: from,
          $lte: to,
        },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$value",
        },
      },
    },
  ]);

  return result[0]?.total ?? 0;
};

export const obtenerUltimosRegistros = async (
  Model,
  user_id,
  from,
  to,
  type,
) => {
  const records = await Model.find({
    user_id,
    created_at: {
      $gte: from,
      $lte: to,
    },
  })
    .sort({ created_at: -1 })
    .limit(5)
    .lean();

  return records.map((record) => ({
    _id: record._id,
    name: record.name,
    category_id: record.category_id,
    amount: record.value,
    type,
    created_at: record.created_at,
  }));
};
