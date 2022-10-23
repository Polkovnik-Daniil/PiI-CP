CREATE TABLE Airplanes 
(
  [ID_airplane] [nvarchar](40) NOT NULL,
  [Name_airplane] [nvarchar](40) NOT NULL,
  [Number_places] [INTEGER],
  [Creator] [nvarchar](40) NOT NULL,
  CONSTRAINT id_airaplne_pk PRIMARY KEY (id_airplane)
);
DROP TABLE Airplanes;