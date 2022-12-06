using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models {
    public class Mans {
        [Key]
        [MaxLength(450)]

        public string IDM { get; set; } //IDMAN
        [MaxLength(450)]

        public string Passport_number { get; set; }
        [MaxLength(450)]

        public string Name { get; set; }
        [MaxLength(450)]

        public string Surname { get; set; }

        public bool Sex { get; set; }
    }
}
