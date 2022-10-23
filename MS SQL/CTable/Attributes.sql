create table [dbo].[Attributes](
	[ID] [nvarchar](40) NOT NULL,						--ID ATTRUBUTE
	[Attribute] [nvarchar](20) NOT NULL,				--ATTRIBUTE(AU)
	[Decipher] [nvarchar](1000) NOT NULL,				--DECIPHER ATTRIBUTE(AU - ADD USERS...)
	[Description] [nvarchar](MAX) NULL,					--DESCRIPTION(THIS ADD INFO IN...)
--	[Section] [nvarchar](200),							--SECTION(INSERT,UPDATE...)
	constraint pk_Attributes primary key ([ID])
);


drop table [dbo].[Attributes];