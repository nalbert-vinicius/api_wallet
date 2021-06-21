const Acoes = require('../models/Acoes');

const adicionaAcao = async data => {
    const acao = new Acoes({
        tag: data.tag,
        tipoOperacao: data.tipoOperacao,
        dataInicio: new Date(),
        quantidade: data.quantidade,
        valorUnitario: data.valorUnitario,
        usuario: data.usuario
    })
    return await acao.save(data)
}

const updateAcoes = async (id, data) =>{
    var result = await Acoes.findByIdAndUpdate(id,data);
    return result;
}

const deletarAcoes = async id => {
    var result = await Acoes.findByIdAndRemove(id)
    return result;
}

const getAcoes = async =>{
    var result = Acoes.find();
    return result
}

const getAcoesId = async id => {
    var result = await Acoes.find({"usuario._id" : id})
    return result;
}

module.exports = {
    adicionaAcao,
    updateAcoes,
    deletarAcoes,
    getAcoes,
    getAcoesId
}