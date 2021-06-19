const express = require('express');
const morgan = require('morgan'); 

// Inicio do projeto
const app = express();

const rotaUsuario = require('./controllers/usuariosController');
const rotaAcoes = require('./controllers/acoesController');

//logs
app.use(morgan('dev'));

//Apontando para dados em JSON
app.use(express.urlencoded({extended: false}));
app.use(express.json())

app.use('/usuarios', rotaUsuario);
app.use('/acoes', rotaAcoes);


module.exports = app;