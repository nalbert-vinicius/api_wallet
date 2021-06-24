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
        type: Date,
        required: [true,"CAMPO DATA OPERAÇÃO OBRIGATÓRIO!"]
    },
    quantidade: {
        type: Number,
        required: [true,"CAMPO QUANTIDADE OBRIGATÓRIO!"]
    },
    valorUnitario: {
        type: Number,
        required: [true,"CAMPO VALOR AÇÃO OBRIGATÓRIO!"]
    },
    usuario: {
        type: {},
    }
})
//                            name model   model     collection
const Operacoes = mongoose.model('OperOperacoes', cadOperacoes, 'Operacoes') 
module.exports = Operacoes;