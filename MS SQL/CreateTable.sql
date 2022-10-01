USE [PiI-CP]
GO

/****** Object:  Table [dbo].[Groups]    Script Date: 30.09.2022 10:03:11 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Groups](
	[ID] [nvarchar](40) NOT NULL,
	[Name] [nvarchar](20) NOT NULL,
	[GAID] [nvarchar](40) NOT NULL,						--Group Attribute ID
 CONSTRAINT [PK_Groups] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
drop table [Groups]


USE [PiI-CP]
GO
---------------------------------------------------------------------------------------------------------------------------------------------
/****** Object:  Table [dbo].[Users]    Script Date: 30.09.2022 10:02:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Users](
	[ID] [nvarchar](40) NOT NULL,
	[Login] [nvarchar](20) NOT NULL,
	[Password] [nvarchar](40) NOT NULL,
	[Firstname] [nvarchar](20) NOT NULL,
	[Lastname] [nvarchar](20) NOT NULL,
	[Email] [nvarchar](20) NOT NULL,
	[GID] [nvarchar](40) NULL,							--Group ID
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [uniq_User] UNIQUE NONCLUSTERED 
(
	[Login] ASC,
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
drop table Users;




CREATE TABLE [dbo].[Attributes](
	[ID] [nvarchar](40) NOT NULL,						--ID ATTRUBUTE
	[Attribute] [nvarchar](20) NOT NULL,				--ATTRIBUTE(AU)
	[Decipher] [nvarchar](1000) NOT NULL,				--DECIPHER ATTRIBUTE(AU - ADD USERS...)
	[Description] [nvarchar](MAX) NULL,					--DESCRIPTION(THIS ADD INFO IN...)
	[Section] [nvarchar](200),							--SECTION(INSERT,UPDATE...)
	CONSTRAINT [PK_Attributes] PRIMARY KEY ([ID])
);

