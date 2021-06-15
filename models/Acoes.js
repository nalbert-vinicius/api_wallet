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
    dataInio: {
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
})
//                            name model   model     collection
const usuarios = mongoose.model('Usuarios', cadAcoes, 'usuarios')

module.exports = usuarios;