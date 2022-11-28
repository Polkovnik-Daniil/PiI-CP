using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models {
    public class Flights {
        [Key]
        public int FID { get; set; } //ID_Flight
        public int IDA { get; set; } //ID_Airplane
        public DateTime Date_and_Time_of_Departure { get; set; }
        public DateTime Date_and_Time_of_Arrival { get; set; }
        public string Departure_Point { get; set; }
        public string Departure_Airport { get; set; }
        public string Point_of_Arrival { get; set; }
        public string Arrival_Airport { get; set; }
        public string Status { get; set; }
        public int Number_Free_places { get; set; }
        public int IDT { get; set; }
    }
}
