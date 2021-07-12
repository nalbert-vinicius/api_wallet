const express = require('express');
const morgan = require('morgan'); 
const cors = require('cors');

// Inicio do projeto
const app = express();
//Habilitando CORS 
// Para criar um objeto de configuração basta acrescentar {origin:['requisicao.com']}
app.use(cors());

const rotaUsuario = require('./controllers/usuariosController');
const rotaOperacoes = require('./controllers/operacoesController');

//logs
app.use(morgan('dev'));

//Apontando para dados em JSON
app.use(express.urlencoded({extended: false}));
app.use(express.json())


// app.use((req, res, next) => {
//     //controle de origin da requisição
//     res.header('Access-Control-Allow-Origin', '*');
    
//     //controle do header
//     res.header('Access-Control-Allow-Header',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );

//     //metodos de retorno
//     if(req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).send({});
//     }
//     next();
// })



app.use('/usuarios', rotaUsuario);
app.use('/operacoes', rotaOperacoes);


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


module.exports = app;