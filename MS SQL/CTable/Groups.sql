create table [dbo].[Groups](
	[ID] [nvarchar](40) NOT NULL,					--ID Group
	[Name] [nvarchar](20) NOT NULL,					--Name Group
	[GAID] [nvarchar](40) NOT NULL,					--Group Attribute ID 
	[GAN] [nvarchar](40) NOT NULL,					--Group Atrribute Name
	constraint pk_Groups primary key([ID])			--Primary key
);

drop table [dbo].[Groups];
--alter table [dbo].[Groups] 
--	drop constraint ID