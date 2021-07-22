const mongoose = require('mongoose');
//model
const esquema = mongoose.Schema;
const cadOperacoes= new esquema({
    tag: {
        type: String,
        required: [true,"CAMPO AÇÃO OBRIGATÓRIO!"]
    },
    tipoOperacao: {
        type: String,
        required: [true,"CAMPO OPERAÇÃO OBRIGATÓRIO!"]
    },
    dataInicio: {
        type: Date
    },
    dataAtualizacao: {
        type: Date
    },
    quantidadeOperacao: {
        type: Number,
        required: [true,"CAMPO QUANTIDADE OBRIGATÓRIO!"]
    },
    valorUnitario: {
        type: Number,
        required: [true,"CAMPO VALOR AÇÃO OBRIGATÓRIO!"]
    },
    valorTotal: {
        type: Number,
    },
    quantidadeAtual: {
        type: Number,
    },
    valorTotalAtual: {
        type: Number,
    },
    verifica: {
        type: Boolean,
    },
    valorPrimeiraOperacao: {
        type: Number
    },
    usuario: {
        type: {},
    }
})
//                            name model   model     collection
const Operacoes = mongoose.model('Operacoes', cadOperacoes, 'Operacoes') 
module.exports = Operacoes;