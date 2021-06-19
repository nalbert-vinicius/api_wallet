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

module.exports = {
    adicionaAcao,
    updateAcoes
}