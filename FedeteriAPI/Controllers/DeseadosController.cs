using FedeteriAPI.Models;
using FedeteriAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FedeteriAPI.Controllers
{
    [Route("api/Usuarios/{userId}/[controller]")]
    [ApiController]
    public class DeseadosController : ControllerBase
    {
        /// <summary>
        /// Retorna los artículos deseados de un usuario en concreto
        /// </summary>
        /// <param name="userId">ID del usuario</param>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<ArticuloDeseado> GetDeseadosByUserId(int userId)
        {
            return UsuariosService.GetArticulosDeseados(userId);
        }

        /// <summary>
        /// Retorna un artículo deseado de un usuario en específico
        /// </summary>
        /// <param name="userId">ID del usuario</param>
        /// <param name="id">ID del artículo deseado</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public ArticuloDeseado GetDeseadoByUserById(int userId, int id)
        {
            return UsuariosService.GetArticulosDeseados(userId).ElementAt(id);
        }

        /// <summary>
        /// Endpoint para sumar un artículo deseado a un usuario en concreto
        /// </summary>
        /// <param name="userId">ID del usuario</param>
        /// <param name="articulo">Objeto ArticuloDeseado (Descripción, Marca)</param>
        /// <returns></returns>
        [HttpPost]
        public bool Post(int userId, [FromBody] ArticuloDeseado articulo)
        {
            return UsuariosService.AddArticuloDeseado(userId, articulo);
        }


        /// <summary>
        /// Endpoint para eliminar un artículo deseado de un usuario en concreto
        /// </summary>
        /// <param name="userId">ID del usuario</param>
        /// <param name="id">ID del artículo a eliminar</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public bool Delete(int userId, int id)
        {
            return UsuariosService.DeleteArticuloDeseado(userId, id);
        }
    }
}
