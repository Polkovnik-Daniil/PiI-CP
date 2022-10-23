alter table [dbo].[Users]
 add constraint uniq_Users Unique (Login, Email);
