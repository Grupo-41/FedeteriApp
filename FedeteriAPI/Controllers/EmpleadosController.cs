using FedeteriAPI.Models;
using FedeteriAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FedeteriAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadosController : ControllerBase
    {
        /// <summary>
        /// Retorna todos los empleados registrados en el sistema
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Usuario> Get()
        {
            return EmpleadosService.GetEmpleados();
        }

        /// <summary>
        /// Retorna un empleado según su ID
        /// </summary>
        /// <param name="id">ID del empleado</param>
        /// <returns></returns>
        // GET api/<EmpleadosController>/5
        [HttpGet("{id}")]
        public Usuario Get(int id)
        {
            return EmpleadosService.GetEmpleadoByID(id);
        }

        /// <summary>
        /// Agrega un empleado al sistema
        /// </summary>
        /// <param name="empleado">Objeto empleado (Nombre, Sucursal, Nacimiento)</param>
        [HttpPost]
        public void RegistrarEmpleado([FromBody] UsuarioIn usuario)
        {
            EmpleadosService.AddEmpleado(usuario);
        }

        /// <summary>
        /// Retorna todos los productos registrados en el sistema
        /// </summary>
        [HttpGet("productos")]
        public IEnumerable<Producto> GetProductos()
        {
            return ProductosService.GetProductos();
        }

        /// <summary>
        /// Retorna el producto que coincida con el código ingresado, si es que lo encuentra. De lo contrario, devuelve NotFound
        /// </summary>
        /// <param name="codigo"></param>
        /// <returns></returns>
        [HttpGet("productos/{codigo}")]
        public ActionResult<Producto> GetProductoByCodigo(string codigo)
        {
            Producto p = ProductosService.GetProductoByCodigo(codigo);

            if (p == null)
                return NotFound();

            return Ok(p);
        }
    }
}
