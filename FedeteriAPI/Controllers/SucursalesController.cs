using FedeteriAPI.Models;
using FedeteriAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FedeteriAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SucursalesController : ControllerBase
    {
        /// <summary>
        /// Retorna todas las sucursales del sistema
        /// </summary>
        [HttpGet]
        public IEnumerable<Sucursal> Get()
        {
            return SucursalesService.GetSucursals();
        }

        /// <summary>
        /// Retorna una sucursal según su ID
        /// </summary>
        /// <param name="id">ID de la sucursal</param>
        /// <returns code="200">Encontró la sucursal</returns>
        /// <returns code="404">Sucursal no encontrada</returns>
        [HttpGet("{id}")]
        public ActionResult<Sucursal> Get(int id)
        {
            Sucursal s = SucursalesService.GetSucursal(id);

            if (s == null)
                return NotFound();

            return Ok(s);
        }
    }
}
