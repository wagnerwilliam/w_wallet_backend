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

  async obtenerUltimosRegistros(Model, user_id, from, to, type) {
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
  }

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

  obtenerRegistrosRecientes = async (user_id, period) => {
    // merece la pena revisar esto quiza puede mejorarse (agregar otra coleccion movimientos que guarde registro tanto de gstos e ingresos)
    //ademas considerar modulos de ctegorias ingresos gastos agregar paginacion y filtros
    //estos filtros deben poder filtrar por mes dia semana y año
    const { from, to } = getDateRange(period);

    const [ingresos, gastos] = await Promise.all([
      this.obtenerUltimosRegistros(Ingresos, user_id, from, to, "income"),
      this.obtenerUltimosRegistros(Gastos, user_id, from, to, "expense"),
    ]);

    return [...ingresos, ...gastos]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);
  };

  async obtenerDashboard(user_id, period) {
    const summary = await this.obtenerResumen(user_id, period);

    const recentRecords = await this.obtenerRegistrosRecientes(user_id, period);

    return {
      summary,
      recentRecords,
    };
  }
}
