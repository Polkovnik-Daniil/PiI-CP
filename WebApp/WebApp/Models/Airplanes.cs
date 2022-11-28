using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models {
    public class Airplanes {
        [Key]
        public int IDA { get; set; } //ID_Airplaness
        public string Name_Airplanes { get; set; }
        public int Number_places { get; set; }
        public string Creator { get; set; }

    }
}
