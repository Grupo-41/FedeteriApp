using FedeteriAPI.Models;
using FedeteriAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FedeteriAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SucursalesController : ControllerBase
    {
        // GET: api/<SucursalesController>
        [HttpGet]
        public IEnumerable<Sucursal> Get()
        {
            return SucursalesService.GetSucursals();
        }

        // GET api/<SucursalesController>/5
        [HttpGet("{id}")]
        public Sucursal Get(int id)
        {
            return SucursalesService.GetSucursal(id);
        }
    }
}
