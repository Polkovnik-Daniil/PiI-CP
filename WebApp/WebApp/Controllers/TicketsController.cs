﻿using Microsoft.AspNetCore.Http;
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
        IRepository<Flights> dbf;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        public TicketsController(UserManager<ApplicationUser> userManager,
                              SignInManager<ApplicationUser> signInManager) {
            db = new TicketsRepository();
            dbf = new FlightsRepository();
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
            return IsAdmin ? db.GetList() : db.GetList().Where(x => x.email == username);
        }

        [HttpPost]
        [Route("create")]
        public bool Create([FromBody] Tickets ticket) {
            //dbf.GetList().Where(x => x.FID == IDF && x.Number_Free_places > 0).FirstOrDefault().Number_Free_places -= 1;
            //dbf - Repository Flights
            Flights? isExist = dbf.GetList().FirstOrDefault(x => x.FID == ticket.IDF&& x.Number_Free_places > 0);
            if (isExist != null) {
                dbf.GetList().FirstOrDefault(x => x.FID == ticket.IDF && x.Number_Free_places > 0).Number_Free_places -= 1;
                db.Create(new Tickets() { ID = ticket.ID, IDF = ticket.IDF, MID = ticket.MID == "null" ? null : ticket.MID, email = ticket.email });
                db.Save();
                dbf.Save();
                return true;
            }
            return false;
        }
        [HttpGet]
        [Route("create")]
        public bool Create(string username, string id, string idf, string mid) {
            //dbf.GetList().Where(x => x.FID == IDF && x.Number_Free_places > 0).FirstOrDefault().Number_Free_places -= 1;
            //dbf - Repository Flights
            Flights? isExist = dbf.GetList().FirstOrDefault(x => x.FID == idf && x.Number_Free_places > 0);
            if (isExist != null) {
                dbf.GetList().FirstOrDefault(x => x.FID == idf && x.Number_Free_places > 0).Number_Free_places -= 1;
                db.Create(new Tickets() { ID = id, IDF = idf, MID = mid == "null" ? null : mid, email = username });
                db.Save();
                dbf.Save();
                return true;
            }
            return false;
        }

        [HttpDelete]
        [Route("delete")]
        public bool Delete([FromBody] Tickets ticket) {
            Tickets? isExist = db.GetList().FirstOrDefault(x => x.ID == ticket.ID);
            if (isExist != null) {
                dbf.GetList().FirstOrDefault(x => x.FID == ticket.IDF && x.Number_Free_places > 0).Number_Free_places += 1;
                db.Delete(ticket.ID);
                return true;
            }
            return false;
        }

        [HttpGet]
        [Route("delete")]
        public bool Delete(string username, string id, string idf, string mid) {
            Tickets? isExist = db.GetList().FirstOrDefault(x => x.ID == id);
            if (isExist != null) {
                dbf.GetList().FirstOrDefault(x => x.FID == idf && x.Number_Free_places > 0).Number_Free_places += 1;
                db.Delete(id);
                return true;
            }
            return false;
        }

        [HttpGet]
        [Route("update")]
        public bool Update(string username, string id, string idf, string mid) {
            Tickets? isExist = db.GetList().FirstOrDefault(x => x.ID == id);
            if (isExist != null) {
                db.Update(new Tickets() { email = username == "null" ? null : username, ID = id, IDF = idf, MID = mid == "null" ? null : mid });
                db.Save();
                return true;
            }
            return false;
        }

        [HttpPut]
        [Route("update")]
        public bool Update([FromBody] Tickets ticket) {
            Tickets? isExist = db.GetList().FirstOrDefault(x => x.ID == ticket.ID);
            if (isExist != null) {
                db.Update(new Tickets() { email = ticket.email, ID = ticket.ID, IDF = ticket.IDF, MID = ticket.MID });
                db.Save();
                return true;
            }
            return false;
        }
    }
}
