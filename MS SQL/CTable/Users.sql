create table [dbo].[Users](
	[ID] [nvarchar](40) NOT NULL,						--ID user
	[Login] [nvarchar](20) NOT NULL,					--Lohin user
	[Password] [nvarchar](40) NOT NULL,					--Password user
	[Firstname] [nvarchar](20) NOT NULL,				--Firstname user
	[Lastname] [nvarchar](20) NOT NULL,					--Latname user
	[Email] [nvarchar](20) NOT NULL,					--Email user
	[GID] [nvarchar](40) NULL,							--Group ID user
	constraint pk_Users primary key([ID]),
	constraint fk_Users_Groups foreign key ([GID])
		references [dbo].[Groups]([ID])
);

drop table [dbo].[Users];

