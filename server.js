require('dotenv').config();
const con = require('./mongo').conexao;
// IMPOTANDO O APP
const app = require('./app')
// IMPORTANDO HTTP PARA CRIAÇÃO DO SERVIDOR
const http = require('http')
//SETANDO A PORTA
const port = 3000;
//CRIAÇÃO DO SERVIDOR
const server = http.createServer(app);
//RODAR NA PORTA 3000
server.listen(port)