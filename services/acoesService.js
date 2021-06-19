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


module.exports = {
    adicionaAcao
}