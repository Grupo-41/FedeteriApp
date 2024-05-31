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
        /// Retorna todos los trueques que han sido aceptados, pendientes de realizarse
        /// </summary>
        /// <returns></returns>
        [HttpGet("[controller]/pendientes")]
        public IEnumerable<TruequeOut> GetPendientes()
        {
            return TruequesService.GetPendientes();
        }

        /// <summary>
        /// Retorna todos los trueques que han sido aceptados, realizados o no
        /// </summary>
        /// <returns></returns>
        [HttpGet("[controller]/aceptados")]
        public IEnumerable<TruequeOut> GetAceptados()
        {
            return TruequesService.GetAceptados();
        }

        /// <summary>
        /// Retorna todos los trueques que han sido realizados
        /// </summary>
        /// <returns></returns>
        [HttpGet("[controller]/realizados")]
        public IEnumerable<TruequeOut> GetRealizados() {
            return TruequesService.GetRealizados();
        }


        /// <summary>
        /// Permite modificar la sucursal en la que se realizará el trueque
        /// </summary>
        /// <returns></returns>
        [HttpPut("[controller]/{truequeId}/sucursal/{sucursalId}")]
        public void PutSucursal(int truequeId, int sucursalId)
        {
            TruequesService.UpdateSucursal(truequeId, sucursalId);
        }

        /// <summary>
        /// Endpoint para proponer un trueque, recibe los IDs de los artículos involucrados y se lo asigna a los usuarios de dichos artículos
        /// </summary>
        /// <param name="newTrueque">Objeto TruequeIn, con información de los artículos involucrados</param>
        [HttpPost("[controller]")]
        public bool PostTrueque(TruequeIn newTrueque)
        {
            if (newTrueque == null) { return false; }

            return TruequesService.AddTrueque(newTrueque);
        }

        /// <summary>
        /// Retorna todos los trueques del usuario, sin importar su aceptación o realización
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        [HttpGet("/api/Usuarios/{userID}/trueques")]
        public IEnumerable<TruequeOut> GetTruequesByUsuario(int userID)
        {
            return TruequesService.GetTruequesByUsuario(userID);
        }


        /// <summary>
        /// Retorna todos los trueques del usuario que no hayan sido aceptados ni rechazados
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        [HttpGet("/api/Usuarios/{userID}/propuestas")]
        public IEnumerable<TruequeOut> GetPropuestasByUsuario(int userID)
        {
            return TruequesService.GetPropuestasByUsuario(userID);
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
        /// Retorna los trueques pendientes (aceptados) de una sucursal
        /// </summary>
        /// <param name="sucursalID"></param>
        /// <returns></returns>
        [HttpGet("/api/Sucursales/{sucursalID}/trueques-pendientes")]
        public IEnumerable<TruequeOut> GetTruequesPendientesBySucursal(int sucursalID)
        {
            return TruequesService.GetTruequesPendientesBySucursal(sucursalID);
        }

        /// <summary>
        /// Marca un trueque como aceptado
        /// </summary>
        /// <param name="truequeId">ID del trueque</param>
        [HttpPut("[controller]/aceptar-trueque/{truequeId}")]
        public void PutAceptarTrueque(int truequeId)
        {
            TruequesService.AceptarTrueque(truequeId);
        }

        /// <summary>
        /// Marca un trueque como rechazado
        /// </summary>
        /// <param name="truequeId">ID del trueque</param>
        [HttpPut("[controller]/rechazar-trueque/{truequeId}")]
        public void PutRechazarTrueque(int truequeId)
        {
            TruequesService.RechazarTrueque(truequeId);
        }

        /// <summary>
        /// Marca un trueque como realizado
        /// </summary>
        /// <param name="truequeId">ID del trueque</param>
        [HttpPut("[controller]/validar-trueque/{truequeId}")]
        public void PutValidarTrueque(int truequeId)
        {
            TruequesService.ValidateTrueque(truequeId, true);
        }

        /// <summary>
        /// Marca un trueque como no-realizado
        /// </summary>
        /// <param name="truequeId">ID del trueque</param>
        [HttpPut("[controller]/invalidar-trueque/{truequeId}")]
        public void PutInvalidarTrueque(int truequeId)
        {
            TruequesService.ValidateTrueque(truequeId, false);
        }
    }
}
