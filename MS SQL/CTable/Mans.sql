CREATE TABLE Mans
(
  [IDMAN] [nvarchar](40) NOT NULL,
  [Passport_number] [nvarchar](40) NOT NULL,
  [Name] [nvarchar](40) NOT NULL,
  [Surname][nvarchar](40) NOT NULL,
  [Sex] bit,
  CONSTRAINT id_mans_pk PRIMARY KEY ([IDMAN]),
);
DROP TABLE Mans;