using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models {
    public class Airplanes {
        [Key]
        [MaxLength(450)]
        public string IDA { get; set; } //ID_Airplaness
        [MaxLength(450)]
        public string Name_Airplanes { get; set; }
        public int Number_places { get; set; }
        [MaxLength(450)]

        public string Creator { get; set; }

    }
}
