using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Controllers {
    [ApiController]
    [Route("api/[controller]/")]
    public class FlightsController : Controller {
        IRepository<Flights> db;
        public FlightsController() {
            db = new FlightsRepository();
        }

        [HttpGet]
        [Route("get")]
        public IEnumerable<Flights> Get() {
            return db.GetList();
        }

        [HttpGet]
        [Route("getId")]
        public Flights GetId(string id) {
            return db.GetElement(id);
        }

        [HttpPost]
        [Route("create")]
        public void Create(string FID, string IDA, DateTime Date_and_Time_of_Departure,
                           DateTime Date_and_Time_of_Arrival, string Departure_Point,
                           string Departure_Airport, string Point_of_Arrival,
                           string Arrival_Airport, string Status,
                           int Number_Free_places, string IDT) {
            db.Create(new Flights() {
                FID = FID,
                IDA = IDA,
                Date_and_Time_of_Departure = Date_and_Time_of_Departure,
                Date_and_Time_of_Arrival = Date_and_Time_of_Arrival,
                Departure_Point = Departure_Point,
                Point_of_Arrival = Point_of_Arrival,
                Arrival_Airport = Arrival_Airport,
                Status = Status,
                Departure_Airport = Departure_Airport,
                Number_Free_places = Number_Free_places,
                IDT = IDT
            });
        }

        [HttpGet]
        [Route("delete")]
        public void Delete(string id) {
            db.Delete(id);
        }

        [HttpGet]
        [Route("update")]
        public void Update(string FID, string IDA, DateTime Date_and_Time_of_Departure,
                           DateTime Date_and_Time_of_Arrival, string Departure_Point,
                           string Departure_Airport, string Point_of_Arrival,
                           string Arrival_Airport, string Status,
                           int Number_Free_places, string IDT) {
            db.Create(new Flights() {
                FID = FID,
                IDA = IDA,
                Date_and_Time_of_Departure = Date_and_Time_of_Departure,
                Date_and_Time_of_Arrival = Date_and_Time_of_Arrival,
                Departure_Point = Departure_Point,
                Point_of_Arrival = Point_of_Arrival,
                Arrival_Airport = Arrival_Airport,
                Status = Status,
                Departure_Airport = Departure_Airport,
                Number_Free_places = Number_Free_places,
                IDT = IDT
            });
        }
    }
}
