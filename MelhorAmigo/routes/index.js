const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../database/connection');

// Rota GET para exibir a página inicial
router.get('/index', (req, res) => {
    const filePath = path.join(__dirname, '..', 'pages', 'index.html'); // Sobe um nível no diretório
    console.log('Caminho do arquivo:', filePath);
    res.sendFile(filePath);
});

// Rota POST para processar o formulário da página inicial
router.post('/index', (req, res) => {
    const email = req.body.email;

    const sql = "INSERT INTO inscritos (email) VALUES (?)";
    connection.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Erro ao salvar no banco:', err);
            res.status(500).json({ message: 'Erro ao cadastrar. Tente novamente.' });
        } else {
            res.status(200).json({ message: 'Inscrição realizada com sucesso!' });
        }
    });
});

// Rota GET para exibir a página de produtos
router.get('/produtos', (req, res) => {
    const filePath = path.join(__dirname, '..', 'pages', 'produtos.html'); // Sobe um nível no diretório
    console.log('Caminho do arquivo:', filePath);
    res.sendFile(filePath);
});

// Rota GET para exibir a página de galeria
router.get('/galeria', (req, res) => {
    const filePath = path.join(__dirname, '..', 'pages', 'galeria.html'); // Sobe um nível no diretório
    console.log('Caminho do arquivo:', filePath);
    res.sendFile(filePath);
});

// Rota GET para exibir a página de contato
router.get('/contato', (req, res) => {
    const filePath = path.join(__dirname, '..', 'pages', 'contato.html'); // Sobe um nível no diretório
    console.log('Caminho do arquivo:', filePath);
    res.sendFile(filePath);
});

// Rota POST para processar o formulário de contato
router.post('/contato', (req, res) => {
    const { name, email, message } = req.body;

    const sql = "INSERT INTO contato (nome_cliente, email_cliente, mensagem) VALUES (?, ?, ?)";
    connection.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('Erro ao salvar no banco:', err);
            res.status(500).json({ message: 'Erro ao enviar a mensagem. Tente novamente.' });
        } else {
            res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
        }
    });
});

module.exports = router;
