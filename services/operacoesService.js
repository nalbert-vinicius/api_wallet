const Operacao = require('../models/Operacoes');

const adicionaOperacao = async data => {
    if(data.tag == '' || data.tipoOeracao == '' || data.dataInicio == '' || data.quantidade == '' || data.valorUnitario == ''){
        return error;
    }

    const operacao = new Operacao({
        tag: data.tag,
        tipoOperacao: data.tipoOperacao,
        dataInicio: data.dataInicio,
        quantidade: data.quantidade,
        valorUnitario: data.valorUnitario,
        usuario: data.usuario
    })
    return await operacao.save(data)
}

const updateOperacao = async (id, data) =>{
    return await Operacao.findByIdAndUpdate(id, data, {new: true}).lean();   
}

const deletarOperacao = async id => {
    var result = await Operacao.findByIdAndRemove(id)
    return result;
}

const getOperacao = async (data) =>{
    var result = Operacao.find({"usuario.email": data}).sort({_id:-1});
    return result
}

const getOperacaoId = async id => {
    var result = await Operacao.find({"usuario._id" : id})
    return result;
}

module.exports = {
    adicionaOperacao,
    updateOperacao,
    deletarOperacao,
    getOperacao,
    getOperacaoId
}