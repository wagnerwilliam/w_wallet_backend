import { Ingresos } from "../models/ingresos.model.js";
import { Gastos } from "../models/gastos.model.js";
import { SavedAmount } from "../models/metas.model.js";
import { getDateRange } from "../utils/dashboard.js";
import {
  round,
  getTotal,
  obtenerUltimosRegistros,
} from "../utils/dashboard.js";

export class DashboardService {
  obtenerResumen = async (user_id, period) => {
    const { from, to } = getDateRange(period);
    const income = await getTotal(Ingresos, user_id, from, to, "value");
    const expense = await getTotal(Gastos, user_id, from, to, "value");
    const savings = await getTotal(SavedAmount, user_id, from, to, "amount");
    const saldo = income - expense - savings;

    return {
      ingresos: round(income),
      gastos: round(expense),
      saldo: round(Math.abs(saldo)),
      destinado_metas: round(savings),
    };
  };

  obtenerRegistrosRecientes = async (user_id, period) => {
    // merece la pena revisar esto quiza puede mejorarse (agregar otra coleccion movimientos que guarde registro tanto de gastos e ingresos)
    //ademas considerar modulos de ctegorias ingresos gastos agregar paginacion y filtros
    const { from, to } = getDateRange(period);

    const [ingresos, gastos, ahorros] = await Promise.all([
      obtenerUltimosRegistros(Ingresos, user_id, from, to, "income", "value"),
      obtenerUltimosRegistros(Gastos, user_id, from, to, "expense", "value"),
      obtenerUltimosRegistros(
        SavedAmount,
        user_id,
        from,
        to,
        "saving",
        "amount",
      ),
    ]);

    return [...ingresos, ...gastos, ...ahorros]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);
  };

  obtenerDashboard = async (user_id, period) => {
    const summary = await this.obtenerResumen(user_id, period);

    const recentRecords = await this.obtenerRegistrosRecientes(user_id, period);

    return {
      summary,
      recentRecords,
    };
  };
}
