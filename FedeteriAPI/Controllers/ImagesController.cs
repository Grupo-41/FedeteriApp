using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FedeteriAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        [HttpGet("{imageName}")]
        public IActionResult Get(string imageName)
        {
            Byte[] b = System.IO.File.ReadAllBytes($@"Images/{imageName}");   // You can use your own method over here.         
            return File(b, "image/jpeg");
        }
    }
}
