using FedeteriAPI.Models;
using FedeteriAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FedeteriAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticulosController : ControllerBase
    {
        /// <summary>
        /// Retorna todos los artículos
        /// </summary>
        [HttpGet]
        public IEnumerable<ArticuloOut> Get()
        {
            return ArticulosService.GetArticulos();
        }

        /// <summary>
        /// Retorna los artículos que ya fueron tasados (listos para publicar)
        /// </summary>
        [HttpGet("tasados")]
        public IEnumerable<ArticuloOut> GetArticulosTasados()
        {
            return ArticulosService.GetArticulosTasados();
        }

        /// <summary>
        /// Retorna los artículos que aún no fueron tasados
        /// </summary>
        [HttpGet("a-tasar")]
        public IEnumerable<ArticuloOut> GetArticulosATasar()
        {
            return ArticulosService.GetArticulosATasar();
        }

        /// <summary>
        /// Endpoint para tasar un artículo
        /// </summary>
        /// <param name="articuloID">ID del artículo a tasar</param>
        /// <param name="precio">Precio tasado</param>
        [HttpPut("tasar")]
        public ActionResult TasarArticulo(int articuloID, double precio)
        {
            if (ArticulosService.TasarArticulo(articuloID, precio))
                return Ok();

            return NotFound();
        }

        /// <summary>
        /// Busca un artículo por su ID
        /// </summary>
        /// <param name="id">ID del artículo</param>
        /// <returns code="200">Se encontró el artículo buscado</returns>
        /// <returns code="404">No se encontró el artículo buscado</returns>
        [HttpGet("{id}")]
        public ActionResult<ArticuloOut> GetArticuloById(int id)
        {
            ArticuloOut articulo = ArticulosService.GetArticulo(id);

            if (articulo == null)
                return NotFound();

            return Ok(articulo);
        }

        /// <summary>
        /// Le asigna un usuario a un artículo y lo agrega en el sistema.
        /// </summary>
        /// <param name="userId">ID del usuario</param>
        /// <param name="articulo">Objeto artículo</param>
        [HttpPost("{userId}")]
        public void PostArticulo(int userId, [FromBody] ArticuloIn articulo)
        {
            ArticulosService.AddArticulo(userId, articulo);
        }

        /// <summary>
        /// Modifica un artículo ya registrado en el sistema
        /// </summary>
        /// <param name="id">ID del artículo</param>
        /// <param name="articulo">Objeto artículo con campos actualizados</param>
        [HttpPut("{id}")]
        public void UpdateArticulo(int id, [FromBody] ArticuloIn articulo)
        {
            ArticulosService.UpdateArticulo(id, articulo);
        }

        /// <summary>
        /// Borra un artículo del sistema
        /// </summary>
        /// <param name="id">ID del artículo</param>
        [HttpDelete("{id}")]
        public void DeleteArticulo(int id)
        {
            ArticulosService.DeleteArticulo(id);
        }
    }
}
