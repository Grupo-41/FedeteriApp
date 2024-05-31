using FedeteriAPI.Models;
using FedeteriAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FedeteriAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentasController : ControllerBase
    {
        /// <summary>
        /// Registra la venta de un artículo de la Fedetería, y suma los puntos al usuario por su compra
        /// </summary>
        /// <param name="idArticulo">ID del artículo vendido</param>
        /// <param name="venta">Objeto venta</param>
        [HttpPost("{idArticulo}")]
        public void Post(int idArticulo, [FromBody] Venta venta)
        {
            VentasService.PostVenta(idArticulo, venta);
        }
    }
}
