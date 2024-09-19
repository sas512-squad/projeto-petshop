require('dotenv').config();
const express = require('express');
const path = require('path');
const routes = require('../routes'); 
const connection = require('./connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'assets')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
