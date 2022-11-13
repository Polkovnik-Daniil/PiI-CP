CREATE TABLE [dbo].[Users](
	[ID] [nvarchar](40) NOT NULL,						--ID user
	[Login] [nvarchar](20) NOT NULL,					--Login user
	[Password] [nvarchar](40) NOT NULL,					--Password user
	[Firstname] [nvarchar](20) NOT NULL,				--Firstname user
	[Lastname] [nvarchar](20) NOT NULL,					--Latname user
	[Email] [nvarchar](20) NOT NULL,					--Email user
	[Roles] [nvarchar](20) NOT NULL,
	CONSTRAINT pk_Users PRIMARY KEY([ID])
);

DROP TABLE [dbo].[Users];

