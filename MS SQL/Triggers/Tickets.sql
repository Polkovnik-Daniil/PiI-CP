CREATE TRIGGER Flight_INSERT
ON [dbo].[Flights]
AFTER INSERT
AS 
BEGIN 
	DECLARE @IDT nvarchar(40) = (select top(1)[IDT] from inserted);
	DECLARE @QueryCreateTicketTable nvarchar(1000) = 'CREATE TABLE ' + @IDT + ' (MID nvarchar(40) NOT NULL,
													isScoled bit, CONSTRAINT PK_' + @IDT + ' PRIMARY KEY (MID), 
													CONSTRAINT FK_' + @IDT + '_Users FOREIGN KEY (MID) REFERENCES dbo.Mans ([IDMAN])
													ON DELETE CASCADE 
													ON UPDATE CASCADE);';        --UID - user ID 
	EXECUTE sp_executesql @QueryCreateTicketTable;
END;
 DROP TRIGGER Flight_INSERT;
