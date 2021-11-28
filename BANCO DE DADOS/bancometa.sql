create database meta;

use meta;

create table cadastro
(idusuario int primary key auto_increment,
NomeCompleto varchar(45),
email varchar(45), 
usuario varchar(20), 
senha varchar(20)
);