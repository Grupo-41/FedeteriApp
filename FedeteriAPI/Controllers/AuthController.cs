using FedeteriAPI.Models;
using FedeteriAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FedeteriAPI.Controllers
{
    [Route("api/Usuarios/")]
    [ApiController]
    public class AuthController : ControllerBase
    {
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
        /// Genera un código de recuperación de cuenta y se lo envía por email al usuario
        /// </summary>
        /// <param name="userMail">Mail del usuario a recuperar</param>
        [HttpPost("recuperacion/{userMail}")]
        public void PutCodigoRecuperacion(string userMail)
        {
            UsuariosService.EnviarCodigoRecuperacionAsync(userMail);
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
        /// Genera un código de inicio de sesión y se lo envía por email al administrador
        /// </summary>
        /// <param name="userMail">Mail del usuario administrador</param>
        [HttpPost("generar-codigo-inicio/{userMail}")]
        public void PutCodigoDeInicio(string userMail)
        {
            UsuariosService.EnviarCodigoInicioAsync(userMail);
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
    }
}
