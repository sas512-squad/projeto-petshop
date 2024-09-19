CREATE DATABASE IF NOT EXISTS petshop;

USE petshop;

CREATE TABLE inscritos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR (255),
    email VARCHAR (255)
);

CREATE TABLE contato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_cliente VARCHAR (255) NOT NULL,
    email_cliente VARCHAR (255) NOT NULL,
    mensagem VARCHAR (1000) NOT NULL
);

SELECT * FROM inscritos;
SELECT * FROM contato;