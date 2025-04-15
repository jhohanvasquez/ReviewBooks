USE [master]
GO
/****** Object:  Database [DBBookReview]    Script Date: 15/04/2025 4:26:06 p. m. ******/
CREATE DATABASE [DBBookReview] ON  PRIMARY 
( NAME = N'DBBookStore', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL10.SQLEXPRESS\MSSQL\DATA\DBBookStore.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'DBBookStore_log', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL10.SQLEXPRESS\MSSQL\DATA\DBBookStore_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [DBBookReview] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DBBookReview].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DBBookReview] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DBBookReview] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DBBookReview] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DBBookReview] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DBBookReview] SET ARITHABORT OFF 
GO
ALTER DATABASE [DBBookReview] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DBBookReview] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DBBookReview] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DBBookReview] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DBBookReview] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DBBookReview] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DBBookReview] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DBBookReview] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DBBookReview] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DBBookReview] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DBBookReview] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DBBookReview] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DBBookReview] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DBBookReview] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DBBookReview] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DBBookReview] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DBBookReview] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DBBookReview] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [DBBookReview] SET  MULTI_USER 
GO
ALTER DATABASE [DBBookReview] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DBBookReview] SET DB_CHAINING OFF 
GO
USE [DBBookReview]
GO
/****** Object:  User [webUser]    Script Date: 15/04/2025 4:26:06 p. m. ******/
CREATE USER [webUser] FOR LOGIN [webUser] WITH DEFAULT_SCHEMA=[dbo]
GO
sys.sp_addrolemember @rolename = N'db_owner', @membername = N'webUser'
GO
sys.sp_addrolemember @rolename = N'db_accessadmin', @membername = N'webUser'
GO
/****** Object:  Table [dbo].[Book]    Script Date: 15/04/2025 4:26:06 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Book](
	[BookID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](100) NOT NULL,
	[Author] [varchar](100) NOT NULL,
	[Category] [varchar](20) NOT NULL,
	[Description] [varchar](200) NOT NULL,
	[CoverFileName] [varchar](100) NULL,
 CONSTRAINT [PK__Book__3DE0C2270AD2A005] PRIMARY KEY CLUSTERED 
(
	[BookID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 15/04/2025 4:26:06 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[CategoryID] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[CategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Review]    Script Date: 15/04/2025 4:26:06 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Review](
	[ReviewId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[BookID] [int] NOT NULL,
	[Rating] [int] NULL,
	[Comment] [varchar](200) NULL,
	[ReviewDate] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Review] PRIMARY KEY CLUSTERED 
(
	[ReviewId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserMaster]    Script Date: 15/04/2025 4:26:06 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserMaster](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](20) NOT NULL,
	[LastName] [varchar](20) NOT NULL,
	[Username] [varchar](20) NOT NULL,
	[Password] [varchar](40) NOT NULL,
	[Gender] [varchar](6) NOT NULL,
	[UserTypeID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserType]    Script Date: 15/04/2025 4:26:06 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserType](
	[UserTypeID] [int] IDENTITY(1,1) NOT NULL,
	[UserTypeName] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Book] ON 
GO
INSERT [dbo].[Book] ([BookID], [Title], [Author], [Category], [Description], [CoverFileName]) VALUES (3, N'libro tes 1', N'jhohan', N'Romance', N'Pruebas descripcion Imagen', N'614dfe3a-4f4e-4c25-8a02-a0b5e8873b5cCaptura de pantalla 2025-02-25 142348.png')
GO
SET IDENTITY_INSERT [dbo].[Book] OFF
GO
SET IDENTITY_INSERT [dbo].[Categories] ON 
GO
INSERT [dbo].[Categories] ([CategoryID], [CategoryName]) VALUES (1, N'Biography')
GO
INSERT [dbo].[Categories] ([CategoryID], [CategoryName]) VALUES (2, N'Fiction')
GO
INSERT [dbo].[Categories] ([CategoryID], [CategoryName]) VALUES (3, N'Mystery')
GO
INSERT [dbo].[Categories] ([CategoryID], [CategoryName]) VALUES (4, N'Fantasy')
GO
INSERT [dbo].[Categories] ([CategoryID], [CategoryName]) VALUES (5, N'Romance')
GO
SET IDENTITY_INSERT [dbo].[Categories] OFF
GO
SET IDENTITY_INSERT [dbo].[Review] ON 
GO
INSERT [dbo].[Review] ([ReviewId], [UserId], [BookID], [Rating], [Comment], [ReviewDate]) VALUES (14, 2, 3, 0, N'test', N'13/04/2025 11:25:22 p. m.')
GO
SET IDENTITY_INSERT [dbo].[Review] OFF
GO
SET IDENTITY_INSERT [dbo].[UserMaster] ON 
GO
INSERT [dbo].[UserMaster] ([UserID], [FirstName], [LastName], [Username], [Password], [Gender], [UserTypeID]) VALUES (1, N'Ankit', N'Sharma', N'adminuser', N'qwerty', N'Male', 1)
GO
INSERT [dbo].[UserMaster] ([UserID], [FirstName], [LastName], [Username], [Password], [Gender], [UserTypeID]) VALUES (2, N'jhohan', N'vasquez', N'alexander', N'Santiago0520*', N'Male', 1)
GO
SET IDENTITY_INSERT [dbo].[UserMaster] OFF
GO
SET IDENTITY_INSERT [dbo].[UserType] ON 
GO
INSERT [dbo].[UserType] ([UserTypeID], [UserTypeName]) VALUES (1, N'Admin')
GO
INSERT [dbo].[UserType] ([UserTypeID], [UserTypeName]) VALUES (2, N'User')
GO
SET IDENTITY_INSERT [dbo].[UserType] OFF
GO
ALTER TABLE [dbo].[Review] ADD  CONSTRAINT [DF_Review_ReviewDate]  DEFAULT (getdate()) FOR [ReviewDate]
GO
ALTER TABLE [dbo].[Review]  WITH CHECK ADD  CONSTRAINT [FK_Review_Book] FOREIGN KEY([BookID])
REFERENCES [dbo].[Book] ([BookID])
GO
ALTER TABLE [dbo].[Review] CHECK CONSTRAINT [FK_Review_Book]
GO
ALTER TABLE [dbo].[Review]  WITH CHECK ADD  CONSTRAINT [FK_Review_UserMaster] FOREIGN KEY([UserId])
REFERENCES [dbo].[UserMaster] ([UserID])
GO
ALTER TABLE [dbo].[Review] CHECK CONSTRAINT [FK_Review_UserMaster]
GO
USE [master]
GO
ALTER DATABASE [DBBookReview] SET  READ_WRITE 
GO
