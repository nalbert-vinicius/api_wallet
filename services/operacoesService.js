const Operacao = require('../models/Operacoes');

const adicionaOperacao = async data => {
    // ************  REFATORAR FUTURAMENTE FUNÇÃO INTEIRA *************
    if(data.tag == '' || data.tipoOeracao == '' || data.dataInicio == '' || data.quantidade == '' || data.valorUnitario == ''){
        return error;
    }

    var result = await findOperacao(data);
    if(result.length == 0){
         const operacao = new Operacao({
            tag: data.tag,
            tipoOperacao: data.tipoOperacao,
            dataInicio: data.dataInicio,
            dataAtualizacao: new Date(),
            quantidadeOperacao: data.quantidadeAtual,
            valorUnitario: data.valorUnitario,
            valorTotal: data.valorUnitario*data.quantidadeAtual,
            quantidadeAtual: data.quantidade,
            valorTotalAtual: data.valorUnitario*data.quantidadeAtual,
            verifica: true,
            valorPrimeiraOperacao: data.valorUnitario*data.quantidadeAtual,
            usuario: data.usuario
        })
        return await operacao.save()
    }else{ 

        const atualizaOperacao = new Operacao({
            _id: result[0]._id,
            tag: result[0].tag,
            tipoOperacao: result[0].tipoOperacao,
            dataInicio: result[0].dataInicio,
            dataAtualizacao: new Date(),
            quantidadeOperacao: result[0].quantidadeOperacao,
            valorUnitario: result[0].valorUnitario,
            valorTotal: result[0].valorTotal,
            quantidadeAtual: result[0].quantidadeAtual,
            valorTotalAtual: result[0].valorTotalAtual,
            verifica: false,
            valorPrimeiraOperacao: result[0].valorPrimeiraOperacao,
            usuario: result[0].usuario
        })
        console.log(atualizaOperacao)
        var resultado = await Operacao.findByIdAndUpdate(result[0]._id, atualizaOperacao, {new: true}).lean();
        console.log(resultado)
        console.log(result[0]._id)
        var valorTotal = data.valorUnitario*data.quantidadeAtual;
        const operacao = new Operacao({
            tag: data.tag,
            tipoOperacao: data.tipoOperacao,
            dataInicio: result[0].dataInicio,
            dataAtualizacao: new Date(),
            quantidadeOperacao: data.quantidadeAtual,
            valorUnitario: data.valorUnitario,
            valorTotal: valorTotal,
            quantidadeAtual: data.tipoOperacao == "Compra" ? result[0].quantidadeAtual+data.quantidadeAtual : result[0].quantidadeAtual-data.quantidadeAtual,
            valorTotalAtual: data.tipoOperacao == "Compra" ? result[0].valorTotalAtual+valorTotal : result[0].valorTotalAtual-valorTotal,
            verifica: true,
            valorPrimeiraOperacao: result[0].valorPrimeiraOperacao,
            usuario: data.usuario
        })
        console.log(operacao)
        return await operacao.save()
    } 
}

const updateOperacao = async (id, data) =>{
    return await Operacao.findByIdAndUpdate(id, data, {new: true}).lean();   
}

const deletarOperacao = async id => {
    var result = await Operacao.findByIdAndRemove(id)
    return result;
}

const getOperacao = async (data) =>{
    var result = Operacao.find({"usuario.email": data, "verifica": true}).sort({_id:-1});
    return result
}

const getOperacaoId = async id => {
    var result = await Operacao.find({"usuario._id" : id})
    return result;
}

const findOperacao = async data =>{
    var result = Operacao.find({"usuario.email": data.usuario.email, "tag": data.tag}).sort({_id:-1}).limit(1);
    return result
}



module.exports = {
    adicionaOperacao,
    updateOperacao,
    deletarOperacao,
    getOperacao,
    getOperacaoId
}