using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models {
    public class Flights {
        [Key]
        public int FID { get; set; } //ID_Flight
        public int IDA { get; set; } //ID_Airplane
        public DateTime Date_and_Time_of_Departure { get; set; }
        public DateTime Date_and_Time_of_Arrival { get; set; }
        public String Departure_Point { get; set; }
        public String Departure_Airport { get; set; }
        public String Point_of_Arrival { get; set; }
        public String Arrival_Airport { get; set; }
        public String Status { get; set; }
        public int Number_Free_places { get; set; }
        public int IDT { get; set; }
    }
}
