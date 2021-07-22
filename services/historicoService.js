const Operacao = require('../models/Operacoes');

const getHistorico = async (email) =>{
    var historico = Operacao.find({"usuario.email": email}).sort({_id:-1});
    return historico
}

const getHistoricoAcao = async (email, acao) => {
    var historicoAcao = Operacao.find({"usuario.email": email, "tag": acao}).sort({_id:-1});
    return historicoAcao;
}

module.exports = {
    getHistorico,
    getHistoricoAcao
}