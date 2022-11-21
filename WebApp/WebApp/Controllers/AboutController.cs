using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class AboutController : Controller {
        IRepository<Mans> db;

        public AboutController() {
            db = new MansRepository();
        }
        // GET: AboutController

        [HttpGet]
        //[Authorize(Roles ="Administrator")]
        public IEnumerable<Mans> Index() {
            return db.GetList();
        }
    }
}
