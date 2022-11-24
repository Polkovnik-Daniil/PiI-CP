using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Controllers {
    [ApiController]
    [System.Web.Http.Authorize(Roles = "Administrator")]
    [Route("api/[controller]/")]
    public class MansController : Controller {
        IRepository<Mans> db;
        public MansController() {
            db = new MansRepository();
        }

        [HttpGet]
        [Route("get")]
        public IEnumerable<Mans> Get() {
            return db.GetList();
        }

        [HttpGet]
        [Route("getId")]
        public Mans GetId(int id) {
            return db.GetElement(id);
        }

        //[HttpPost]
        //[Route("create")]
        //public void Create(int IDM, String Passport_number, String Name, String Surname, bool Sex) {
        //    db.Create(new Mans() { IDM = IDM, Passport_number = Passport_number, Name = Name, Surname = Surname, Sex = Sex });
        //}

        [HttpPost]
        [Route("create")]
        public void Create([FromBody] Mans man) {
            db.Create(man);
        }



        [HttpGet]
        [Route("delete")]
        public void Delete(int id) {
            db.Delete(id);
        }

        [HttpGet]
        [Route("update")]
        public void Update(int IDM, String Passport_number, String Name, String Surname, bool Sex) {
            db.Update(new Mans() { IDM = IDM, Passport_number = Passport_number, Name = Name, Surname = Surname, Sex = Sex });
        }
    }
}
