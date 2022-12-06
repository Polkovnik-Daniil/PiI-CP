CREATE TABLE Mans
(
  [IDM] [nvarchar](40) NOT NULL,
  [Passport_number] [nvarchar](40) NOT NULL,
  [Name] [nvarchar](40) NOT NULL,
  [Surname][nvarchar](40) NOT NULL,
  [Sex] bit,
  CONSTRAINT idm_pk PRIMARY KEY ([IDM]),
);
DROP TABLE Mans;