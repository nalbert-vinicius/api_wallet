const Usuarios = require('../models/Usuarios');



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
        
        if(hash){
            
        }else{
            return error;
        }
    }else{
        return msg = "Usuário não existe no banco!";
    }
}

const getUser = async data =>{
    var resultado = await Usuarios.find({email : data});
    return resultado;
}

module.exports = {
    atualizaUsuario,
    removerUsuario,
    login, 
    getUser
};