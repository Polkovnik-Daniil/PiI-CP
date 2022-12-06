CREATE TABLE Airplanes 
(
  [IDA] [nvarchar](40) NOT NULL,
  [Name_airplane] [nvarchar](40) NOT NULL,
  [Number_places] [INTEGER],
  [Creator] [nvarchar](40) NOT NULL,
  CONSTRAINT ida_pk PRIMARY KEY ([IDA])
);
DROP TABLE Airplanes;