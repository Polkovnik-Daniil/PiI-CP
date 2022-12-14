using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApp.Data;
using WebApp.Models;


namespace WebApp.Controllers {
    [ApiController]
    [Route("api/[controller]/")]
    public class AirplanesController : Controller {
        //IRepository<Airplanes> db;
        UnitOfWork unitOfWork;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        public AirplanesController(UserManager<ApplicationUser> userManager,
                                   SignInManager<ApplicationUser> signInManager) {
            //db = new AirplanesRepository();
            unitOfWork = new UnitOfWork();
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpGet]
        [Route("canaccess")]
        public async Task<bool> CanAccess(string username) {
            bool IsAdmin = await IsAdminAsync(username);
            return IsAdmin;
        }
        private async Task<bool> IsAdminAsync(string username) {
            if (username != null || username != "") {
                ApplicationUser user = await userManager.FindByEmailAsync(username);
                // Get the roles for the user
                bool IsAdmin = await userManager.IsInRoleAsync(user, "Administrator");
                return IsAdmin;
            }
            return false;
        }

        [HttpGet]
        [Route("get")]
        public async Task<IEnumerable<Airplanes>?> GetAsync(string username) {
            bool IsAdmin = await IsAdminAsync(username);
            return IsAdmin ? unitOfWork.Airplanes.GetList() : null;
        }

        [HttpGet]
        [Route("create")]
        public async Task<bool> Create(string username, string ida, string name_airplane, int number_places, string creator) {
            bool IsAdmin = await IsAdminAsync(username);
            if (IsAdmin) {
                unitOfWork.Airplanes.Create(new Airplanes() { IDA = ida, Name_Airplanes = name_airplane, Number_places = number_places, Creator = creator });
                unitOfWork.Save();
                return true;
            }
            return false;
        }

        [HttpGet]
        [Route("delete")]
        public async Task<bool> Delete(string username, string idm) {
            bool IsAdmin = await IsAdminAsync(username);
            if (IsAdmin) {
                unitOfWork.Airplanes.Delete(idm);
                unitOfWork.Save();
                return true;
            }
            return false;
        }

        [HttpGet]
        [Route("update")]
        public async Task<bool> Update(string username, string ida, string name_airplane, int number_places, string creator) {
            bool IsAdmin = await IsAdminAsync(username);
            if (IsAdmin) {
                unitOfWork.Airplanes.Update(new Airplanes() { IDA = ida, Name_Airplanes = name_airplane, Number_places = number_places, Creator = creator });
                unitOfWork.Save();
                return true;
            }
            return false;
        }
    }
}
