using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class AboutController : Controller {
        // GET: AboutController

        [HttpGet]
        //[Authorize(Roles ="Administrator")]
        public IEnumerable<String> Index() {
            List<String> list = new List<String>();
            list.Add("fdiuvb");
            if (User.Identity!.Name == "0205danik@gmail.com")
                list.Add("fdiuvb2983r");
            
            return list.AsEnumerable();
        }
    }
}
