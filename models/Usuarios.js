const mongoose = require('mongoose');
//model
const esquema = mongoose.Schema;
const cadUsuarios = new esquema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: [true,"CAMPO E-MAIL OBRIGATÓRIO!"],
    },
    senha: {
        type: String,
        required: [true, "CAMPO SENHA OBRIGATÓRIO!"],
    }
})
//                            name model   model     collection
const usuarios = mongoose.model('Usuarios', cadUsuarios, 'usuarios')

module.exports = usuarios;