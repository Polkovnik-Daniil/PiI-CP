CREATE TRIGGER Groups_INSERT
ON Groups
INSTEAD OF INSERT
AS 
BEGIN 
	DECLARE @Name nvarchar(20) = (select top(1)[Name] from inserted),
			@GAID nvarchar(40) = (select top(1)GAID from inserted),
			@ID nvarchar(40) = (select top(1)ID from inserted);
	Print @GAID;
	Print @Name;
	Print @ID;
	DECLARE @QueryCreateGroupTable nvarchar(1000) = 'CREATE TABLE ' + @Name + ' (UID nvarchar(40) NOT NULL, CONSTRAINT PK_' + @Name + ' PRIMARY KEY (UID), 
													CONSTRAINT FK_' + @Name + '_Users FOREIGN KEY (UID) REFERENCES dbo.Users (ID)
													ON DELETE CASCADE 
													ON UPDATE CASCADE);', --UID - user ID 
			@QueryInsertData nvarchar(100) = 'INSERT INTO [dbo].[Groups] ([ID], [Name], [GAID]) VALUES (N''' + @ID + ''' , N''' + @Name + ''' , N''' + @GAID +''')'; --,
			--!������� ���� ��������(� ������ ��� ��������� ������� ������ ��� ������ �� ������ � ��������� ��� �������� �� �������)!--
			--@QueryCreateGroupAttrTable nvarchar(100) = 'CREATE TABLE ' + @GAID + '()';
			--!create connection between table!--
			--example--
	PRINT 'HI'
	EXECUTE sp_executesql @QueryCreateGroupTable, @QueryInsertData;
	PRINT 'HI1'

END;
 
DROP TRIGGER Groups_INSERT;

INSERT INTO Groups VALUES (N'42b10aa0-4d90-4e84-8c90-1dfb7109609e', N'admin', N'5f62d7cb-eddc-4d59-a04f-4213c6aebabf');