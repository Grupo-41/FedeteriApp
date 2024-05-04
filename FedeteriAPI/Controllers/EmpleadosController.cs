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
    }
}
