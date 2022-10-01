
ALTER TABLE [dbo].[Attributes]
	ADD CONSTRAINT uniq_Attributes UNIQUE([ID], [Attribute],
										  [Decipher], [Description],
										  [Section]);
