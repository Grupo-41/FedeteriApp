using FedeteriAPI.Models;
using FedeteriAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FedeteriAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        /// <summary>
        /// Retorna todos los usuarios del sistema
        /// </summary>
        [HttpGet]
        public IEnumerable<UsuarioIn> Get()
        {
            return UsuariosService.GetUsuarios();
        }

        /// <summary>
        /// Permite buscar un usuario según su ID
        /// </summary>
        /// <returns code="200">Se retornó el usuario correspondiente al ID</returns>
        /// <returns code="404">No se encontró el usuario correspondiente</returns>
        [HttpGet("{id}")]
        public ActionResult<UsuarioIn> Get(int id)
        {
            UsuarioIn usuario = UsuariosService.GetUsuarioByID(id);

            if (usuario == null)
                return NotFound();

            return Ok(usuario);
        }

        /// <summary>
        /// Retorna los artículos de un usuario en específico
        /// </summary>
        /// <param name="userId">ID del usuario</param>
        [HttpGet("{userId}/articulos")]
        public List<ArticuloOut> GetArticulosByUsuario(int userId)
        {
            return ArticulosService.GetArticulosByUsuario(userId);
        }

        /// <summary>
        /// Registra un usuario en el sistema, recibe un objeto Usuario
        /// </summary>
        /// <param name="usuario">Objeto usuario</param>
        // POST api/<UsuariosController>
        [HttpPost("")]
        public void PostUsuario([FromBody] UsuarioIn usuario)
        {
            UsuariosService.Add(usuario);
        }

        [HttpPost("recuperar/{userId}")]
        public async Task PutCodigoRecuperacion(int userId)
        {
            await UsuariosService.EnviarCodigoRecuperacionAsync(userId);
        }
    }
}
