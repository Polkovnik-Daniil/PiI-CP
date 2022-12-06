using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models {
    [Keyless]
    public class Tickets {
        [MaxLength(450)]
        public string IDF { get; set; }
        [MaxLength(450)]
        public string? MID { get; set; }
        [MaxLength(450)]
        public string? email { get; set; }
    }
}
