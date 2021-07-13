const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const operacoesServices = require('../services/operacoesService');

router.post('/cadastrar', login, async (req, res, next) => {
   const data = req.body;
   try{
        const result = await operacoesServices.adicionaOperacao(data);
        return res.status(201).send({
            msg: "Operação cadastrada com sucesso!",
            result: result
        })

   }catch(err){
       res.status(401).send({
           msg: "Erro!",
           error: err
       })
   }
})

router.patch('/atualizar/:id', login, async (req, res, next) => {
    const data = req.body;
    const id = req.params.id
    try{   
        const result = await operacoesServices.updateOperacao(id,data);
        return res.status(200).send({
            msg: "ALTERADO COM SUCESSO!",
            result: result
        })
    }catch(err){
        res.status(401).send({
            msg: "Erro ao atualizar!",
            error: err
        })
    }
})

router.delete('/deletar/:id', login, async (req, res, next) => {
    const id = req.params.id;
    try{
        const result = await operacoesServices.deletarOperacao(id);
        return res.status(200).send({
            msg: "Deletado com sucesso!",
            result: result
        })
    }catch(err){
        res.status(401).send({
            msg: "Erro ao deletar!",
            error: err
        })
    }
})

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

router.get('/operacao/:id', login,async (req, res, next) =>{
    const id = req.params.id;
    try{
        const result = await operacoesServices.getOperacaoId(id);
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