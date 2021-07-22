const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const operacoesServices = require('../services/operacoesService');

router.get('/', login,async (req, res, next) =>{
    try{
        obj = [];
        const result = await operacoesServices.getOperacao(req.body.usuario.email);

        for (let index = 0; index < result.length; index++) {
            obj.push({name: result[index].tag, value: result[index].valorTotalAtual}) 
        }
        return res.status(200).send({
            obj
        })
    }catch(err){
        res.status(401).send({
            msg: "Erro - buscar operação!",
            error: err
        })
    }
})

module.exports = router;