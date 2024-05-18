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
        [HttpGet]
        public IEnumerable<ArticuloDeseado> GetDeseadosByUserId(int userId)
        {
            return UsuariosService.GetArticulosDeseados(userId);
        }

        [HttpGet("{id}")]
        public ArticuloDeseado GetDeseadoByUserById(int userId, int id)
        {
            return UsuariosService.GetArticulosDeseados(userId).ElementAt(id);
        }

        [HttpPost]
        public bool Post(int userId, [FromBody] ArticuloDeseado articulo)
        {
            return UsuariosService.AddArticuloDeseado(userId, articulo);
        }

        [HttpDelete("{id}")]
        public bool Delete(int userId, int id)
        {
            return UsuariosService.DeleteArticuloDeseado(userId, id);
        }
    }
}
