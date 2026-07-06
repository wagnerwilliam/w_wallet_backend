import { Ingresos } from "../models/ingresos.model.js";
import { Gastos } from "../models/gastos.model.js";
import { getDateRange } from "../utils/dateRange.js";
import { round } from "../utils/dateRange.js";

export class DashboardService {
  total = async (Model, user_id, from, to) => {
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

  async obtenerResumen(user_id, period) {
    const { from, to } = getDateRange(period);

    const income = await this.total(Ingresos, user_id, from, to);
    const expense = await this.total(Gastos, user_id, from, to);

    return {
      ingresos: round(income),
      gastos: round(expense),
      saldo: round(Math.abs(income - expense)),
      ahorro: round(Math.abs(income - expense)),
    };
  }
}
