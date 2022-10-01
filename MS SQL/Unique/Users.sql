ALTER TABLE [dbo].[Users]
 ADD CONSTRAINT uniq_User UNIQUE (Login, Email);
