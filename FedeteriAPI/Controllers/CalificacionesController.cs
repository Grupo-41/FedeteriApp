using FedeteriAPI.Models;
using FedeteriAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FedeteriAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalificacionesController : ControllerBase
    {
        /// <summary>
        /// Retorna un resumen de las calificaciones de todas las sucursales
        /// </summary>
        /// <returns></returns>
        [HttpGet("sucursales")]
        public IEnumerable<CalificacionSucursalResult> GetCalificacionesSucursales()
        {
            return CalificacionesService.GetCalificacionesSucursales();
        }

        /// <summary>
        /// Retorna todas las calificaciones detalladas de una sucursal
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("sucursales/{id}")]
        public IEnumerable<CalificacionSucursal> GetCalificacionesSucursal(int id)
        {
            return CalificacionesService.GetCalificacionesSucursal(id);
        }

        /// <summary>
        /// Retorna un resumen de calificación de todos los usuarios
        /// </summary>
        /// <returns></returns>
        [HttpGet("usuarios")]
        public IEnumerable<CalificacionUsuarioResult> GetCalificacionesUsuarios()
        {
            return CalificacionesService.GetCalificacionesUsuarios();
        }

        /// <summary>
        /// Retorna un resumen de calificación de un usuario en específico
        /// </summary>
        /// <param name="id">ID del usuario</param>
        /// <returns></returns>
        [HttpGet("usuarios/{id}")]
        public CalificacionUsuarioResult GetCalificacionUsuario(int id)
        {
            return CalificacionesService.GetCalificacionUsuario(id);
        }

        /// <summary>
        /// Retorna todas las calificaciones que se le hicieron a un usuario específico
        /// </summary>
        /// <param name="id">ID del usuario</param>
        /// <returns></returns>
        [HttpGet("usuarios/{id}/detalles")]
        public IEnumerable<CalificacionUsuario> GetCalificacionesUsuario(int id)
        {
            return CalificacionesService.GetCalificacionesUsuario(id);
        }


        /// <summary>
        /// Endpoint para calificar una sucursal
        /// </summary>
        /// <param name="calificacion">Objeto CalificacionSucursal</param>
        [HttpPost("calificar-sucursal")]
        public void CalificarSucursal([FromBody] CalificacionSucursal calificacion)
        {
            CalificacionesService.CalificarSucursal(calificacion);
        }

        /// <summary>
        /// Endpoint para calificar un usuario
        /// </summary>
        /// <param name="calificacion">Objeto CalificacionUsuario</param>
        [HttpPost("calificar-usuario")]
        public void CalificarUsuario([FromBody] CalificacionUsuario calificacion)
        {
            CalificacionesService.CalificarUsuario(calificacion);
        }
    }
}
