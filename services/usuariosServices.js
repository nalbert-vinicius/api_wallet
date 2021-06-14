const Usuarios = require('../models/Usuarios');

const cadastroUsuario = async (data) => {
    const usuarios = new Usuarios({
        nome: data.nome,
        email: data.email,
        senha: data.senha
    });
        return usuarios.save();     
}

const atualizaUsuario = async (id,data) => {
    var retorno = Usuarios.findByIdAndUpdate(id, data)
    return retorno;
}

const removerUsuario = async id =>{
    var result = Usuarios.findByIdAndRemove(id);
    return result;
}

module.exports = {
    cadastroUsuario,
    atualizaUsuario,
    removerUsuario
};