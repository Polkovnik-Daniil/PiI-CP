using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models {
    public class Flights {
        [Key]
        [MaxLength(450)]

        public string FID { get; set; } //ID_Flight
        [MaxLength(450)]
        public string IDA { get; set; } //ID_Airplane
        public DateTime Date_and_Time_of_Departure { get; set; }
        public DateTime Date_and_Time_of_Arrival { get; set; }
        [MaxLength(450)]
        public string Departure_Point { get; set; }
        [MaxLength(450)]
        public string Departure_Airport { get; set; }
        [MaxLength(450)]
        public string Point_of_Arrival { get; set; }
        [MaxLength(450)]

        public string Arrival_Airport { get; set; }
        [MaxLength(450)]
        public string Status { get; set; }
        public int Number_Free_places { get; set; }
    }
}
