const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');

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

const login = async data => {
   var result = await Usuarios.findOne({email : data.email}, (err, sucess) => {
    if(err){
       return obj = {
           msg: "E-mail ou senha incorreto",
           erro: err
        };
    }

    if(sucess == null){
        return obj = {
            msg: "USUÁRIO OU SENHA INCORRETO!"
        }
    }else{
        if(sucess.senha != null && sucess.senha == data.senha){
            let token = jwt.sign({
                _id: sucess._id,
                email: sucess.email    
            }, process.env.JWT_KEY,
                {expiresIn: "1h"}
            )
            obj = {
                msg: "Autenticado com sucesso!",
                token: token
            }
        }
    }
   });
   return obj;
}

module.exports = {
    cadastroUsuario,
    atualizaUsuario,
    removerUsuario,
    login
};