
ALTER TABLE [dbo].[Attributes]
	ADD CONSTRAINT uniq_Attributes UNIQUE([Attribute],
										  [Decipher]);
