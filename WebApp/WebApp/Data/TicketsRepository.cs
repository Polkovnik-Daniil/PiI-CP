﻿using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;
using WebApp.Models;

namespace WebApp.Data {
    public class TicketsRepository : IRepository<Tickets> {
        private ApplicationDbContext db;

        public TicketsRepository(ApplicationDbContext db) {
            this.db = db;//new ApplicationDbContext(ApplicationDbContext._options, ApplicationDbContext._operationalStoreOptions);
        }

        public IEnumerable<Tickets> GetList() {
            return db.Tickets;
        }

        public Tickets GetElement(string id) {
            return db.Tickets.Find(id);
        }

        public void Create(Tickets ticket) {
            db.Tickets.Add(ticket);
        }

        public void Update(Tickets ticket) {
            db.Entry(ticket).State = EntityState.Modified;
        }

        public void Delete(string id) {
            Tickets ticket = db.Tickets.Find(id);
            if (ticket != null)
                db.Tickets.Remove(ticket);
        }

        public void Delete(Tickets ticket) {
            if (ticket != null)
                db.Tickets.Remove(ticket);
        }

        public void Save() {
            db.SaveChanges();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing) {
            if (!this.disposed) {
                if (disposing) {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose() {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
