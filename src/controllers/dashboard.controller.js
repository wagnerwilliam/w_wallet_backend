/**
 * Controlador encargado de gestionar las peticiones relacionadas
 * con el dashboard del usuario.
 */
export class DashboardController {
  constructor(DashboardService) {
    this._dashboardService = DashboardService;
  }

  obtener = async (request, response) => {
    try {
      let { period = "month" } = request.query;
      let { user_id } = request;

      const dashboard = await this._dashboardService.obtenerDashboard(
        user_id,
        period,
      );

      return response.json(dashboard);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };
}
