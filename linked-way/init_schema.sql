create database if not exists lw;

create user if not exists 'lwuser'@'%' identified by'lwpassword';

grant all on *.* to 'lwuser'@'%';
