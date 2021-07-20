const Operacao = require('../models/Operacoes');

const getHistorico = async (email) =>{
    var historico = Operacao.find({"usuario.email": email});
    return historico
}

const getHistoricoAcao = async (email, acao) => {
    var historicoAcao = Operacao.find({"usuario.email": email, "tag": acao});
    return historicoAcao;
}

module.exports = {
    getHistorico,
    getHistoricoAcao
}