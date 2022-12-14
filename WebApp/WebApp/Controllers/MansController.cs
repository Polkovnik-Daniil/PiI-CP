using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Net.Mail;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics.Arm;
using System.Xml.Linq;
using WebApp.Data;
using WebApp.Models;
using static Humanizer.In;

namespace WebApp.Controllers {
    [ApiController]
    [Route("api/[controller]/")]
    public class MansController : Controller {
        //IRepository<Mans> db;
        UnitOfWork unitOfWork;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        public MansController(UserManager<ApplicationUser> userManager,
                              SignInManager<ApplicationUser> signInManager) {
            //db = new MansRepository();
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
        public async Task<IEnumerable<Mans>?> GetAsync(string username) {
            bool IsAdmin = await IsAdminAsync(username);
            return IsAdmin ? unitOfWork.Mans.GetList() : null;
        }


        [HttpGet]
        [Route("create")]
        public async Task<bool> CreateAsync(string username, string idm, string passport_number, string name, string surname, bool sex) {
            bool IsAdmin = await IsAdminAsync(username);
            if (IsAdmin) {
                unitOfWork.Mans.Create(new Mans() { IDM = idm, Passport_number = passport_number, Name = name, Surname = surname, Sex = sex });
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
                unitOfWork.Flights.Delete(idm);
                unitOfWork.Save();
                return true;
            }
            return false;
        }

        [HttpGet]
        [Route("update")]
        public async Task<bool> Update(string username, string IDM, string Passport_number, string Name, string Surname, bool Sex) {
            bool IsAdmin = await IsAdminAsync(username);
            if (IsAdmin) {
                unitOfWork.Mans.Update(new Mans() { IDM = IDM, Passport_number = Passport_number, Name = Name, Surname = Surname, Sex = Sex });
                unitOfWork.Save();
                return true;
            }
            return false;
        }
    }
}