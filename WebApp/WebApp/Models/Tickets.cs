using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models {
    public class Tickets {
        [Key]
        [MaxLength(450)]
        public string ID { get; set; }
        [MaxLength(450)]
        public string IDF { get; set; }
        [MaxLength(450)]
        public string? MID { get; set; }
        [MaxLength(450)]
        public string? email { get; set; }
    }
}
