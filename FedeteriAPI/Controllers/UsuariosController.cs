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
        /// Retorna la lista de deseos de un usuario
        /// </summary>
        /// <param name="userId">ID del usuario</param>
        [HttpGet("{userId}/deseados")]
        public IEnumerable<string> GetListaDeDeseados(int userId)
        {
            return UsuariosService.GetListaDeDeseos(userId);
        }

        /// <summary>
        /// Agrega un artículo a la lista de deseos de un usuario
        /// </summary>
        /// <param name="userId">ID del usuario</param>
        /// <param name="articulo">Nombre del artículo</param>
        [HttpPost("{userId}/deseados/{articulo}")]
        public void AddArticuloDeseado(int userId, string articulo)
        {
            UsuariosService.AddArticuloDeseado(userId, articulo);
        }

        /// <summary>
        /// Genera un código de inicio de sesión y se lo envía por email al administrador
        /// </summary>
        /// <param name="userMail">Mail del usuario administrador</param>
        [HttpPost("generar-codigo-inicio/{userMail}")]
        public async Task PutCodigoDeInicio(string userMail)
        {
            await UsuariosService.EnviarCodigoInicioAsync(userMail);
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
        /// Actualiza la contraseña de un usuario que no sabe su contraseña
        /// </summary>
        /// <param name="usuarioRecoveryPass">Objeto UsuarioRecoveryPass (Email del usuario, contraseña nueva)</param>
        /// <returns>True o False en caso de realizarse o no el cambio de contraseña</returns>
        [HttpPut("recuperar-contrasena")]
        public bool PutRecoveryPassword([FromBody] UsuarioRecoveryPass usuarioRecoveryPass)
        {
            return UsuariosService.RecoveryPassword(usuarioRecoveryPass);
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

        /// <summary>
        /// Valida las credenciales de inicio de sesión de un usuario
        /// </summary>
        /// <param name="usuario">Credenciales (email y contraseña)</param>
        /// <returns>Un objeto UsuarioOut si las credenciales son correctas, null si las credenciales son incorrectas</returns>
        [HttpGet("login")]
        public UsuarioOut GetLogin([FromQuery] CredencialesUsuario usuario)
        {
            return UsuariosService.ValidarLogin(usuario);
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
