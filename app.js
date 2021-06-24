const express = require('express');
const morgan = require('morgan'); 

// Inicio do projeto
const app = express();

const rotaUsuario = require('./controllers/usuariosController');
const rotaOperacoes = require('./controllers/operacoesController');

//logs
app.use(morgan('dev'));

//Apontando para dados em JSON
app.use(express.urlencoded({extended: false}));
app.use(express.json())

//quando não encontrar nenhuma das rotas entra aqui
app.use((req, res, next) => {
    const erro = new Error("Erro rota não encontrada");
    erro.status = 404;
    next(erro);
})
//retorno do erro
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        msg: error.message
    })
});


app.use('/usuarios', rotaUsuario);
app.use('/operacoes', rotaOperacoes);


module.exports = app;