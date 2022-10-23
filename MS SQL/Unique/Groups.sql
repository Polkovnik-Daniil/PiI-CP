alter table Groups
 add constraint uniq_Groups unique (Name, GAID, GAN);

alter table Groups
 drop constraint uniq_Groups;