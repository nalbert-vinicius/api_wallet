const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const operacoesServices = require('../services/operacoesService');

router.get('/', login,async (req, res, next) =>{
    try{
        
        const result = await operacoesServices.getOperacao(req.body.usuario.email);
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