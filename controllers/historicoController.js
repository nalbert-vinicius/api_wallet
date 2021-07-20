const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const historicoServices = require('../services/historicoService');

router.get('/', login,async (req, res, next) =>{
    try{
        
        const result = await historicoServices.getHistorico(req.body.usuario.email);
        return res.status(200).send({
            msg: "Lista",
            result: result
        })
    }catch(err){
        res.status(401).send({
            msg: "Erro ao buscar operação!",
            error: err
        })
    }
})

router.get('/acao', login,async (req, res, next) =>{
    try{
        
        const result = await historicoServices.getHistoricoAcao(req.body.usuario.email, req.body.tag);
        return res.status(200).send({
            msg: "Lista",
            result: result
        })
    }catch(err){
        res.status(401).send({
            msg: "Erro ao buscar operação!",
            error: err
        })
    }
})

module.exports = router;