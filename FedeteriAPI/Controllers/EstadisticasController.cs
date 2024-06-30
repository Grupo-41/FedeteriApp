using FedeteriAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using System.Runtime.InteropServices;

namespace FedeteriAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadisticasController : ControllerBase
    {
        /// <summary>
        /// Retorna todas las ventas agrupadas por sucursal, con el monto total recaudado, en un rango de fechas específico
        /// </summary>
        /// <param name="inicio">Fecha de inicio</param>
        /// <param name="fin">Fecha de fin</param>
        /// <returns></returns>
        [HttpGet("ventas-sucursal")]
        public IEnumerable<VentasPorSucursal> GetVentasPorSucursal([FromQuery] string inicio = "", [FromQuery] string? fin = "")
        {
            return EstadisticasService.GetVentasPorSucursal(FromStringDate(inicio), FromStringDate(fin));
        }

        /// <summary>
        /// Retorna la cantidad de destacados, junto con el monto total recaudado, en un rango de fechas específico
        /// </summary>
        /// <param name="inicio">Fecha de inicio</param>
        /// <param name="fin">Fecha de fin</param>
        /// <returns></returns>
        [HttpGet("destacados")]
        public EstadisticaDestacados GetDestacadosPorFecha([FromQuery] string inicio = "", [FromQuery] string? fin = "")
        {
            return EstadisticasService.GetDestacadosPorFecha(FromStringDate(inicio), FromStringDate(fin));
        }

        private static DateOnly? FromStringDate(string date)
        {
            if(string.IsNullOrEmpty(date)) return null;

            string[] dateSplitted = date.Split('-');
            int year = int.Parse(dateSplitted[0]);
            int month = int.Parse(dateSplitted[1]);
            int day = int.Parse(dateSplitted[2]);

            return DateOnly.FromDateTime(new DateTime(year, month, day));
        }
    }
}
