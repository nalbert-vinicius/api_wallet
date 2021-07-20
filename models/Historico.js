const mongoose = require('mongoose');
//model
const esquema = mongoose.Schema;
const historico= new esquema({
    historico: {
        type: {},
    }
})
//                            name model   model     collection
const Operacoes = mongoose.model('historico', historico, 'historico') 
module.exports = Operacoes;