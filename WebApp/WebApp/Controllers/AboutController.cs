using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Controllers {
    [ApiController]
    [Route("api/[controller]/")]
    public class AboutController : Controller {
        IRepository<Mans> db;

        public AboutController() {
            db = new MansRepository();
        }
        [HttpGet]
        [Route("get")]
        //[Authorize(Roles ="Administrator")]
        public IEnumerable<Mans> Get() {
            return db.GetList();
        }
    }
}
