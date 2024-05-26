using FedeteriAPI.Models;
using FedeteriAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FedeteriAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class TruequesController : ControllerBase
    {
        /// <summary>
        /// Retorna todos los trueques del sistema
        /// </summary>
        /// <returns></returns>
        [HttpGet("[controller]")]
        public IEnumerable<TruequeOut> Get()
        {
            return TruequesService.GetAll();
        }

        /// <summary>
        /// Endpoint para proponer un trueque, recibe los IDs de los artículos involucrados y se lo asigna a los usuarios de dichos artículos
        /// </summary>
        /// <param name="newTrueque">Objeto TruequeIn, con información de los artículos involucrados</param>
        [HttpPost("[controller]")]
        public void PostTrueque(TruequeIn newTrueque)
        {
            if (newTrueque == null) { return; }

            TruequesService.AddTrueque(newTrueque);
        }

        /// <summary>
        /// Retorna todos los trueques del usuario, sin importar su aceptación y validación
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        [HttpGet("/api/Usuarios/{userID}/trueques")]
        public IEnumerable<TruequeOut> GetTruequesByUsuario(int userID)
        {
            return TruequesService.GetTruequesByUsuario(userID);
        }


        /// <summary>
        /// Retorna los trueques pendientes (aceptados) de un usuario
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        [HttpGet("/api/Usuarios/{userID}/trueques-pendientes")]
        public IEnumerable<TruequeOut> GetTruequesPendientesByUsuario(int userID)
        {
            return TruequesService.GetTruequesPendientesByUsuario(userID);
        }

        /// <summary>
        /// Marca un trueque como aceptado
        /// </summary>
        /// <param name="truequeId">ID del trueque</param>
        [HttpPut("aceptar-trueque/{truequeId}")]
        public void PutAceptarTrueque(int truequeId)
        {
            TruequesService.AceptarTrueque(truequeId);
        }

        /// <summary>
        /// Marca un trueque como rechazado
        /// </summary>
        /// <param name="truequeId">ID del trueque</param>
        [HttpPut("rechazar-trueque/{truequeId}")]
        public void PutRechazarTrueque(int truequeId)
        {
            TruequesService.RechazarTrueque(truequeId);
        }

        /// <summary>
        /// Marca un trueque como realizado
        /// </summary>
        /// <param name="truequeId">ID del trueque</param>
        [HttpPut("validar-trueque/{truequeId}")]
        public void PutValidarTrueque(int truequeId)
        {
            TruequesService.ValidateTrueque(truequeId, true);
        }

        /// <summary>
        /// Marca un trueque como no-realizado
        /// </summary>
        /// <param name="truequeId">ID del trueque</param>
        [HttpPut("invalidar-trueque/{truequeId}")]
        public void PutInvalidarTrueque(int truequeId)
        {
            TruequesService.ValidateTrueque(truequeId, false);
        }
    }
}
