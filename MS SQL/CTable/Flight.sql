CREATE TABLE Flights
(
  [ID_Flight] [nvarchar](40) NOT NULL,
  [ID_Airplane] [nvarchar](40) NOT NULL,
  [Date_and_Time_of_Departure] date NOT NULL,
  [Date_and_Time_of_Arrival] date NOT NULL,
  [Departure_Point] [nvarchar](40) NOT NULL,
  [Departure_Airport] [nvarchar](40) NOT NULL,
  [Point_of_Arrival] [nvarchar](40) NOT NULL,
  [Arrival_Airport] [nvarchar](40) NOT NULL,
  [Status] [nvarchar](40) NOT NULL,
  [Number_Free_places] INTEGER NOT NULL,
  [IDT] [nvarchar](40) NOT NULL,						--ID table Tickets flight
  CONSTRAINT id_flights_pk PRIMARY KEY (id_flight),
    CONSTRAINT fk_id_airplane
      FOREIGN KEY (id_airplane)
      REFERENCES Airplanes(id_airplane)
);
DROP TABLE Flights;