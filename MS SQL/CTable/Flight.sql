CREATE TABLE Flights
(
  [FID] [nvarchar](40) NOT NULL,
  [IDA] [nvarchar](40) NOT NULL,
  [Date_and_Time_of_Departure] date NOT NULL,
  [Date_and_Time_of_Arrival] date NOT NULL,
  [Departure_Point] [nvarchar](40) NOT NULL,
  [Departure_Airport] [nvarchar](40) NOT NULL,
  [Point_of_Arrival] [nvarchar](40) NOT NULL,
  [Arrival_Airport] [nvarchar](40) NOT NULL,
  [Status] [nvarchar](40) NOT NULL,
  [Number_Free_places] [INTEGER] NOT NULL,
  [IDT] [nvarchar](40) NOT NULL,						--ID table Tickets flight
  CONSTRAINT idf_pk PRIMARY KEY ([FID]),
  CONSTRAINT fk_ida
	FOREIGN KEY ([IDA])
	REFERENCES Airplanes([IDA])
);
DROP TABLE Flights;