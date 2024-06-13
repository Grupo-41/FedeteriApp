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
        /// Retorna todos los artículos de la Fedeteria (ventas)
        /// </summary>
        /// <returns></returns>
        [HttpGet("Fedeteria")]
        public IEnumerable<ArticuloFedeteria> GetArticulosFedeteria()
        {
            return VentasService.GetArticulosFedeteria();
        }

        /// <summary>
        /// Retorna artículos de la Fedeteria (ventas) según su ID
        /// </summary>
        /// <param name="id">ID del artículo</param>
        /// <returns></returns>
        [HttpGet("Fedeteria/{id}")]
        public ArticuloFedeteria GetArticulosFedeteria(int id)
        {
            return VentasService.GetArticuloFedeteria(id);
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
        /// Retorna todos los artículos que fueron tasados y aún no han sido truequeados (los que deberían estar publicados)
        /// </summary>
        /// <returns></returns>
        [HttpGet("publicados")]
        public IEnumerable<ArticuloOut> GetArticulosPublicados()
        {
            return ArticulosService.GetArticulosPublicados();
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
        /// <param name="precioEstimado">Precio estimado del artículo, que va a usarse para asignarle una categoría correspondiente</param>
        [HttpPut("tasar/{articuloID}")]
        public ActionResult TasarArticulo(int articuloID, [FromBody] int precioEstimado)
        {
            if (ArticulosService.TasarArticulo(articuloID, precioEstimado))
                return Ok();

            return NotFound();
        }

        /// <summary>
        /// Le asigna un usuario a un artículo y lo agrega en el sistema
        /// </summary>
        /// <param name="userId">ID del usuario</param>
        /// <param name="articulo">Objeto artículo</param>
        [HttpPost("{userId}")]
        public async Task PostArticulo(int userId, [FromForm] ArticuloIn articulo)
        {
            await ArticulosService.AddArticulo(userId, articulo);
        }

        /// <summary>
        /// Modifica un artículo ya registrado en el sistema
        /// </summary>
        /// <param name="id">ID del artículo</param>
        /// <param name="articulo">Objeto artículo con campos actualizados</param>
        [HttpPut("{id}")]
        public void UpdateArticulo(int id, [FromForm] ArticuloIn articulo)
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

        /// <summary>
        /// Endpoint para comentar una publicación
        /// </summary>
        /// <param name="id">ID del artículo</param>
        /// <param name="comentario">Texto del comentario</param>
        [HttpPost("{id}/comentar")]
        public void ComentarArticulo(int id, [FromBody] string comentario) {
            ArticulosService.AddComentario(id, comentario);
        }

        /// <summary>
        /// Endpoint para responder al comentario de una publicación
        /// </summary>
        /// <param name="id">ID del artículo</param>
        /// <param name="comentarioId">ID del comentario</param>
        /// <param name="respuesta">Texto de la respuesta</param>
        [HttpPost("{id}/responder/{comentarioId}")]
        public void ResponderComentario(int id, int comentarioId, [FromBody] string respuesta)
        {
            ArticulosService.AddRespuesta(id, comentarioId, respuesta);
        }
    }
}
