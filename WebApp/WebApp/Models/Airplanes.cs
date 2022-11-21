using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models {
    public class Airplanes {
        [Key]
        public int IDA { get; set; } //ID_Airplaness
        public String Name_Airplanes { get; set; }
        public int Number_places { get; set; }
        public String Creator { get; set; }

    }
}
