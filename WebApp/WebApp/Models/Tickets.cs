using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models {
    public class Tickets {
        [Key]
        public int IDF { get; set; }
        public int MID { get; set; }
    }
}
