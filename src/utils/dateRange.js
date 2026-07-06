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
