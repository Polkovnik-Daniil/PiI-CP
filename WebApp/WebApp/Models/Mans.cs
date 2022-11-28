using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models {
    public class Mans {
        [Key]
        public int IDM { get; set; } //IDMAN
        public string Passport_number { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool Sex { get; set; }
    }
}
