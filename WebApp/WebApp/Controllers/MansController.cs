using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Net.Mail;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Controllers {
    [ApiController]
    [Route("api/[controller]/")]
    public class MansController : Controller {
        IRepository<Mans> db;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        public MansController(UserManager<ApplicationUser> userManager,
                              SignInManager<ApplicationUser> signInManager) {
            db = new MansRepository();
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpGet]
        [Route("get")]
        public async Task<IEnumerable<Mans>?> GetAsync(string username) {
            if (username != null || username != "") {
                ApplicationUser user = await userManager.FindByEmailAsync(username);
                // Get the roles for the user
                bool IsAdmin = await userManager.IsInRoleAsync(user, "Administrator");
                return IsAdmin ? db.GetList() : null;
            }
            Response.StatusCode = 204;
            return null;
        }

        [HttpGet]
        [Route("getId")]
        public Mans GetId(int id) {
            return db.GetElement(id);
        }

        //[HttpPost]
        //[Route("create")]
        //public void Create(int IDM, string Passport_number, string Name, string Surname, bool Sex) {
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
        public void Update(int IDM, string Passport_number, string Name, string Surname, bool Sex) {
            db.Update(new Mans() { IDM = IDM, Passport_number = Passport_number, Name = Name, Surname = Surname, Sex = Sex });
        }
    }
}
