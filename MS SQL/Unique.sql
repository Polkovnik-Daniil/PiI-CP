ALTER TABLE Groups
 ADD CONSTRAINT uniq_Groups UNIQUE (Name, GAID)

ALTER TABLE Groups
 DROP CONSTRAINT uniq_Groups;

ALTER TABLE [dbo].[Users]
 ADD CONSTRAINT uniq_User UNIQUE (Login, Email)
