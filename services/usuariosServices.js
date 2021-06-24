const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');

const cadastroUsuario = async (data) => {
    var result = await Usuarios.find({"email": data.email});
    if(result.length > 0){
        const usuarios = new Usuarios({
            nome: data.nome,
            email: data.email,
            senha: data.senha
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
       return result;
    }

module.exports = {
    cadastroUsuario,
    atualizaUsuario,
    removerUsuario,
    login
};