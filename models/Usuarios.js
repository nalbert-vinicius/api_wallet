const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//model
const esquema = mongoose.Schema;
const cadUsuarios = new esquema({
    nome: {
        type: String,
        required: [true,"CAMPO NOME OBRIGATÓRIO!"]
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