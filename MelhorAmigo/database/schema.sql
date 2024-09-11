CREATE DATABASE IF NOT EXISTS petshop;

USE petshop;

CREATE TABLE inscritos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR (255),
    email VARCHAR (255)
);

CREATE TABLE contato (
    id_mensagem INT AUTO_INCREMENT PRIMARY KEY,
    nome_cliente VARCHAR(255),
    email_cliente VARCHAR(255),
    mensagem VARCHAR(1000)
);

SELECT * FROM inscritos;
SELECT * FROM contato;
