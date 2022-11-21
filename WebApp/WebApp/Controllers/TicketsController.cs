using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Controllers {
    [ApiController]
    [Route("api/[controller]/")]
    public class TicketsController : Controller {
        IRepository<Tickets> db;
        public TicketsController() {
            db = new TicketsRepository();
        }

        [HttpGet]
        [Route("get")]
        public IEnumerable<Tickets> Get() {
            return db.GetList();
        }

        [HttpGet]
        [Route("getId")]
        public Tickets GetId(int id) {
            return db.GetElement(id);
        }

        [HttpPost]
        [Route("create")]
        public void Create(int IDF, int MID) {
            db.Create(new Tickets() { IDF = IDF, MID = MID});
        }

        [HttpPost]
        [Route("delete")]
        public void Delete(int id) {
            db.Delete(id);
        }

        [HttpPost]
        [Route("update")]
        public void Update(int IDF, int MID) {
            db.Update(new Tickets() { IDF = IDF, MID = MID });
        }
    }
}
