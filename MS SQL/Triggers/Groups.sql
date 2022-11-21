CREATE TRIGGER Groups_INSERT
ON [dbo].[Groups]
AFTER INSERT
AS 
BEGIN 
	DECLARE @Name nvarchar(20) = (select top(1)[Name] from inserted),
			@GAID nvarchar(40) = (select top(1)[GAID] from inserted),
			@ID nvarchar(40) = (select top(1)[ID] from inserted),
			@GAN nvarchar(40) = (select top(1)[GAN] from inserted);
	Print @GAID;
	Print @Name;
	Print @ID;
	Print @GAN;
	DECLARE @QueryCreateGroupTable nvarchar(1000) = 'CREATE TABLE ' + @Name + ' (UID nvarchar(40) NOT NULL, CONSTRAINT PK_' + @Name + ' PRIMARY KEY (UID), 
													CONSTRAINT FK_' + @Name + '_Users FOREIGN KEY (UID) REFERENCES dbo.Users (ID)
													ON DELETE CASCADE 
													ON UPDATE CASCADE);',        --UID - user ID 
			--!������� ���� ��������(� ������ ��� ��������� ������� ������ ��� ������ �� ������ � ��������� ��� �������� �� �������)!--
			@QueryCreateGroupAttrTable nvarchar(1000) = 'CREATE TABLE GA' + @Name + ' (ATTRIBUTES nvarchar(20) NOT NULL, PERMISSION bit, CONSTRAINT UNIQ_GA' + @Name + ' UNIQUE (ATTRIBUTES))';
			--!create connection between table!--
			--example--
	EXECUTE sp_executesql @QueryCreateGroupTable, @QueryCreateGroupAttrTable;
	PRINT @QueryCreateGroupTable
END;
 
DROP TRIGGER Groups_INSERT;

INSERT INTO Groups VALUES (N'42b10aa0-4d90-4e84-8c90-1dfb7109609e', N'admin', N'5f62d7cb-eddc-4d59-a04f-4213c6aebabf', 'adminATTR');