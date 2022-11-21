using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models {
    public class Mans {
        [Key]
        public int IDM { get; set; } //IDMAN
        public String Passport_number { get; set; }
        public String Name { get; set; }
        public String Surname { get; set; }
        public bool Sex { get; set; }
    }
}
