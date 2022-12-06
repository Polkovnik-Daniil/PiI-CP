using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        public TicketsController(UserManager<ApplicationUser> userManager,
                              SignInManager<ApplicationUser> signInManager) {
            db = new TicketsRepository();
            this.userManager = userManager;
            this.signInManager = signInManager;
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
        public async Task<IEnumerable<Tickets>?> Get(string username) {
            bool IsAdmin = await IsAdminAsync(username);
            return IsAdmin ? db.GetList() : db.GetList().Where(x=>x.email == username);
        }

        [HttpGet]
        [Route("create")]
        public void Create(string username,string IDF, string MID) {
            db.Create(new Tickets() { IDF = IDF, MID = MID, email = username});
        }

        [HttpGet]
        [Route("delete")]
        public void Delete(string id) {
            db.Delete(id);
        }

        [HttpGet]
        [Route("update")]
        public void Update(string IDF, string MID) {
            db.Update(new Tickets() { IDF = IDF, MID = MID });
        }
    }
}
