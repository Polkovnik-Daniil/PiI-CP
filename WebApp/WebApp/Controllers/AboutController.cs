using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Controllers {
    [ApiController]
    [Route("api/[controller]/")]
    public class AboutController : Controller {
        UnitOfWork unitOfWork;
        public AboutController() {
            unitOfWork = new UnitOfWork();
        }
        [HttpGet]
        [Route("get")]
        //[Authorize(Roles ="Administrator")]
        public String Get() {
            return "Helloy!";
        }
    }
}
