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

        /// <summary>
        /// Actualiza la contraseña del usuario, si este existe. Retorna True si se cambió con éxito. False en cc.
        /// </summary>
        /// <param name="usuarioPass">Objeto UsuarioPass (ID del usuario, Contraseña actual, Contraseña nueva)</param>
        /// <returns>True o False en caso de realizarse o no el cambio de contraseña</returns>
        [HttpPut("cambiar-contrasena")]
        public bool PutPassword([FromBody] UsuarioPass usuarioPass)
        {
            return UsuariosService.ChangePassword(usuarioPass);
        }

        /// <summary>
        /// Genera un código de recuperación de cuenta y se lo envía por email al usuario
        /// </summary>
        /// <param name="userMail">Mail del usuario a recuperar</param>
        [HttpPost("recuperacion/{userMail}")]
        public async Task PutCodigoRecuperacion(string userMail)
        {
            await UsuariosService.EnviarCodigoRecuperacionAsync(userMail);
        }

        /// <summary>
        /// Valida el código de recuperación de un usuario, devolviendo True (en caso de ser correcto) o False (cc)
        /// </summary>
        /// <param name="userMail">Mail del usuario</param>
        /// <param name="codigo">Codigo a validar</param>
        /// <returns></returns>
        [HttpGet("recuperacion/{userMail}/validar/{codigo}")]
        public bool GetValidacion(string userMail, string codigo)
        {
            return CodigosService.ValidarCodigo(userMail, codigo);
        }
    }
}
