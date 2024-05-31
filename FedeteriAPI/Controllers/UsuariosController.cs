using FedeteriAPI.Models;
using FedeteriAPI.Services;
using Microsoft.AspNetCore.Mvc;
using static FedeteriAPI.Services.Responses;

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
        public IEnumerable<Usuario> Get()
        {
            return UsuariosService.GetUsuarios();
        }

        /// <summary>
        /// Permite buscar un usuario según su ID
        /// </summary>
        /// <returns code="200">Se retornó el usuario correspondiente al ID</returns>
        /// <returns code="404">No se encontró el usuario correspondiente</returns>
        [HttpGet("{id}")]
        public ActionResult<Usuario> Get(int id)
        {
            Usuario usuario = UsuariosService.GetUsuarioByID(id);

            if (usuario == null)
                return NotFound();

            return Ok(new UsuarioOut(usuario));
        }

        /// <summary>
        /// Retorna los puntos adquiridos de un usuario en específico
        /// </summary>
        /// <param name="userId">ID del usuario</param>
        /// <returns></returns>
        [HttpGet("{userId}/puntos")]
        public int GetPuntosByUsuario(int userId)
        {
            return UsuariosService.GetUsuarioByID(userId).Puntos;
        }

        /// <summary>
        /// Retorna los artículos de un usuario en específico
        /// </summary>
        /// <param name="userId">ID del usuario</param>
        [HttpGet("{userId}/articulos")]
        public IEnumerable<ArticuloOut> GetArticulosByUsuario(int userId)
        {
            return ArticulosService.GetArticulosByUsuario(userId);
        }

        /// <summary>
        /// Registra un usuario en el sistema, recibe un objeto Usuario
        /// </summary>
        /// <param name="usuario">Objeto usuario</param>
        [HttpPost]
        public void RegistrarUsuario([FromBody] UsuarioIn usuario)
        {
            UsuariosService.AddUsuario(usuario);
        }

        /// <summary>
        /// Permite modificar los datos personales de un usuario
        /// </summary>
        /// <param name="datos">Objeto de datos personales</param>
        [HttpPut]
        public ActionResult<UsuarioOut> ModificarUsuario([FromBody] DatosPersonalesUsuario datos) {
            UsuarioOut u = UsuariosService.UpdateUsuario(datos);

            if (u != null)
                return Ok(u);

            return NotFound();
        }

        /// <summary>
        /// Retorna true si ya existe un usuario registrado con el email otorgado. False en cc
        /// </summary>
        /// <param name="email">Email a comprobar</param>
        /// <returns></returns>
        [HttpGet("existe-email/{email}")]
        public bool ExistsUserByEmail(string email)
        {
            return UsuariosService.ExistsUserByEmail(email);
        }

        /// <summary>
        /// Retorna true si ya existe un usuario registrado con el DNI que se le otorga como parámetro. False en cc
        /// </summary>
        /// <param name="dni">DNI a comprobar</param>
        /// <returns></returns>
        [HttpGet("existe-dni/{dni}")]
        public bool ExistsUserByDNI(long dni)
        {
            return UsuariosService.ExistsUserByDNI(dni);
        }
    }
}
