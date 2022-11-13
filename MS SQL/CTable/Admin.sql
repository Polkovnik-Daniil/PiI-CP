CREATE TABLE Admin(
	[UID] [nvarchar](40) NOT NULL,						--ID user
	CONSTRAINT pk_Admin PRIMARY KEY([UID]),
	CONSTRAINT fk_ID_Users
		FOREIGN KEY ([UID])
		REFERENCES Users(ID)
);