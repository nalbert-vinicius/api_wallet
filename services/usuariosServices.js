const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const cadastroUsuario = async (data) => {
    var result = await Usuarios.find({"email": data.email});
    if(result.length == 0){
        var hash = await bcrypt.hash(data.senha, 10);
        const usuarios = new Usuarios({
            nome: data.nome,
            email: data.email,
            senha: hash
        });
        return usuarios.save()
    }else{
        return error;
    }  
}

const atualizaUsuario = async (id,data) => {
    var retorno = await Usuarios.findByIdAndUpdate(id, data, {new: true}).lean();
    return retorno;
}

const removerUsuario = async id =>{
    var result = Usuarios.findByIdAndRemove(id);
    return result;
}

const login = async data => {
    var usuario = await Usuarios.find({email : data.email});
    if(usuario.length > 0){
        var hash = await bcrypt.compare(data.senha, usuario[0].senha);
        if(hash){
            let token = jwt.sign({
                _id: usuario[0]._id,
                email: usuario[0].email    
            }, process.env.JWT_KEY,
            {expiresIn: "1h"}
            )
           return obj = {
                msg: "Autenticado com sucesso!",
                token: token,
            }
        }else{
            return error;
        }
    }else{
        return msg = "Usuário não existe no banco!";
    }
}

module.exports = {
    cadastroUsuario,
    atualizaUsuario,
    removerUsuario,
    login
};