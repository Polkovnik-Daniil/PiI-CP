CREATE TABLE Tickets(
	[IDF] [INTEGER] NOT NULL,
	[MID] [INTEGER] NOT NULL,
  CONSTRAINT id_tickets_pk PRIMARY KEY ([IDF]),
  CONSTRAINT fk_idf
	FOREIGN KEY ([IDF])
	REFERENCES Flights([FID]),
  CONSTRAINT fk_idm
	FOREIGN KEY ([MID])
	REFERENCES Mans([IDM])
);

CREATE TRIGGER Tickets_INSERT
ON [dbo].[Flights]
AFTER INSERT
AS 
BEGIN 
	DECLARE @IDF nvarchar(40) = (select top(1)[IDF] from inserted),
			@CFP INTEGER = (SELECT TOP(1)[Number_Free_places] FROM Flights WHERE [ID_Flight] = (select top(1)[IDF] from inserted));
	DECLARE @QueryCreateTicketTable nvarchar(1000) = 'UPDATE Flight SET [Number_Free_places] = '+@CFP + ' WHERE [ID_Flight] = ' + @IDF;        --UID - user ID 
	EXECUTE sp_executesql @QueryCreateTicketTable;
END;
 --DROP TRIGGER Flight_INSERT;
