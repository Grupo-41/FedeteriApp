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
        // GET: api/<TruequesController>
        [HttpGet("[controller]")]
        public IEnumerable<TruequeOut> Get()
        {
            return TruequesService.GetAll();
        }

        [HttpPost("[controller]")]
        public void PostTrueque(TruequeIn newTrueque)
        {
            if (newTrueque == null) { return; }

            TruequesService.AddTrueque(newTrueque);
        }
    }
}
