CREATE TABLE Flights
(
  [id_flight] [nvarchar](40) NOT NULL,
  [id_airplane] [nvarchar](40) NOT NULL,
  [date_and_time_of_departure] date NOT NULL,
  [date_and_time_of_arrival] date NOT NULL,
  [departure_point] [nvarchar](40) NOT NULL,
  [departure_airport] [nvarchar](40) NOT NULL,
  [point_of_arrival] [nvarchar](40) NOT NULL,
  [arrival_airport] [nvarchar](40) NOT NULL,
  [status] [nvarchar](40) NOT NULL,
  [IDT] [nvarchar](40) NOT NULL,						--ID table Tickets flight
  CONSTRAINT id_flights_pk PRIMARY KEY (id_flight),
    CONSTRAINT fk_id_airplane
      FOREIGN KEY (id_airplane)
      REFERENCES Airplanes(id_airplane)
);
DROP TABLE Flights;