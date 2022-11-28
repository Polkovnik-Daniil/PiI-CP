using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Data;
using WebApp.Models;


namespace WebApp.Controllers {
    [ApiController]
    [Route("api/[controller]/")]
    public class AirplanesController : Controller {
        IRepository<Airplanes> db;
        public AirplanesController() {
            db = new AirplanesRepository();
        }

        [HttpGet]
        [Route("get")]
        public IEnumerable<Airplanes> Get() {
            return db.GetList();
        }

        [HttpGet]
        [Route("getId")]
        public Airplanes GetId(int id) {
            return db.GetElement(id);
        }

        [HttpPost]
        [Route("create")]
        public void Create(int ida, string Name_Airplane, int Number_places, string Creator) {
            db.Create(new Airplanes() { IDA = ida, Name_Airplanes = Name_Airplane, Number_places = Number_places, Creator = Creator });
        }

        [HttpGet]
        [Route("delete")]
        public void Delete(int id) {
            db.Delete(id);
        }

        [HttpGet]
        [Route("update")]
        public void Update(int ida, string Name_Airplane, int Number_places, string Creator) {
            db.Update(new Airplanes() { IDA = ida, Name_Airplanes = Name_Airplane, Number_places = Number_places, Creator = Creator });
        }
    }
}
