using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Controllers {
    [ApiController]
    [Route("api/[controller]/")]
    public class FlightsController : Controller {
        IRepository<Flights> db;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        public FlightsController(UserManager<ApplicationUser> userManager,
                              SignInManager<ApplicationUser> signInManager) {
            db = new FlightsRepository();
            this.userManager = userManager;
            this.signInManager = signInManager;
        }


        [HttpGet]
        [Route("canaccess")]
        public async Task<bool> IsAdminAsync(string username) {
            if (username != null || username != "") {
                ApplicationUser user = await userManager.FindByEmailAsync(username);
                bool IsAdmin = await userManager.IsInRoleAsync(user, "Administrator");                 // Get the roles for the user
                return IsAdmin;
            }
            return false;
        }

        [HttpGet]
        [Route("get")]
        public IEnumerable<Flights> Get() {
            return db.GetList();
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
            });
        }
    }
}
