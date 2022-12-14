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
        //IRepository<Flights> db;
        UnitOfWork unitOfWork;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        public FlightsController(UserManager<ApplicationUser> userManager,
                              SignInManager<ApplicationUser> signInManager) {
            //db = new FlightsRepository();
            unitOfWork = new UnitOfWork();
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
            return unitOfWork.Flights.GetList();
        }

        [HttpPost]
        [Route("create")]
        public async Task<bool> CreateAsync(string username, string fid, string ida, DateTime date_and_Time_of_Departure,
                           DateTime date_and_Time_of_Arrival, string departure_Point,
                           string departure_Airport, string point_of_Arrival,
                           string arrival_Airport, string status,
                           int number_Free_places) {
            bool IsAdmin = await IsAdminAsync(username);
            if (IsAdmin) {
                unitOfWork.Flights.Create(new Flights() {
                    FID = fid,
                    IDA = ida,
                    Date_and_Time_of_Departure = date_and_Time_of_Departure,
                    Date_and_Time_of_Arrival = date_and_Time_of_Arrival,
                    Departure_Point = departure_Point,
                    Point_of_Arrival = point_of_Arrival,
                    Arrival_Airport = arrival_Airport,
                    Status = status,
                    Departure_Airport = departure_Airport,
                    Number_Free_places = number_Free_places
                });
                unitOfWork.Save();
                return true;
            }
            return false;
        }

        [HttpPost]
        [Route("update")]
        public async Task<bool> Update(string username, string fid, string ida, DateTime date_and_Time_of_Departure,
                           DateTime date_and_Time_of_Arrival, string departure_Point,
                           string departure_Airport, string point_of_Arrival,
                           string arrival_Airport, string status,
                           int number_Free_places) {
            bool IsAdmin = await IsAdminAsync(username);
            if (IsAdmin) {
                unitOfWork.Flights.Update(new Flights() {
                    FID = fid,
                    IDA = ida,
                    Date_and_Time_of_Departure = date_and_Time_of_Departure,
                    Date_and_Time_of_Arrival = date_and_Time_of_Arrival,
                    Departure_Point = departure_Point,
                    Point_of_Arrival = point_of_Arrival,
                    Arrival_Airport = arrival_Airport,
                    Status = status,
                    Departure_Airport = departure_Airport,
                    Number_Free_places = number_Free_places
                });
                unitOfWork.Save();
                return true;
            }
            return false;
        }

        [HttpPut]
        [Route("delete")]
        public async void Delete(string username, string fid) {
            bool isAdmin = await IsAdminAsync(username);
            if(isAdmin) {
                unitOfWork.Flights.Delete(fid);
            }
        }

    }
}
