const mongoose = require('mongoose');
//model
const esquema = mongoose.Schema;
const cadAcoes= new esquema({
    tag: {
        type: String,
        required: true
    },
    tipoOperacao: {
        type: String,
        required: true
    },
    dataInicio: {
        type: Date,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    valorUnitario: {
        type: Number,
        required: true
    },
    usuario: {
        type: mongoose.ObjectId,
        ref: 'Usuarios',
        required: true
    }
})
//                            name model   model     collection
const acoes = mongoose.model('Acoes', cadAcoes, 'acoes') 
module.exports = acoes;