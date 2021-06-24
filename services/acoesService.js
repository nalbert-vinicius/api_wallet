const Acoes = require('../models/Acoes');

const adicionaAcao = async data => {
    if(data.tag == '' || data.tipoOeracao == '' || data.dataInicio == '' || data.quantidade == '' || data.valorUnitario == ''){
        return error;
    }
    var result = await Acoes.findOne({"tag": data.tag}, (error, sucess) => {
        if(error){
            return error;
        }

        if(result.tag == data.tag){

        }
    })
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
    return await Acoes.findByIdAndUpdate(id, data, {new: true}).lean();   
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