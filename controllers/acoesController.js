const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const acoesServices = require('../services/acoesService');

router.post('/cadastrar', login, async (req, res, next) => {
   const data = req.body;
   try{
        const result = await acoesServices.adicionaAcao(data);
        return res.status(201).send({
            msg: "Ações cadastradas com sucesso!",
            result: result
        })

   }catch(err){
       res.status(400).send({
           msg: "Erro!",
           error: err
       })
   }
})

router.patch('/atualizar/:id', login, async (req, res, next) => {
    const data = req.body;
    const id = req.params.id
    try{   
        const result = await acoesServices.updateAcoes(id,data);
        return res.status(200).send({
            msg: "ALTERADO COM SUCESSO!",
            result: result
        })
    }catch(err){
        res.status(400).send({
            msg: "Erro ao atualizar!",
            error: err
        })
    }
})

router.delete('/deletar/:id', login, async (req, res, next) => {
    const id = req.params.id;
    try{
        const result = await acoesServices.deletarAcoes(id);
        return res.status(200).send({
            msg: "Deletado com sucesso!",
            result: result
        })
    }catch(err){
        res.status(400).send({
            msg: "Erro ao deletar!",
            error: err
        })
    }
})

router.get('/', login,async (req, res, next) =>{
    try{
        const result = await acoesServices.getAcoes();
        return res.status(200).send({
            msg: "Lista",
            result: result
        })
    }catch(err){
        res.status(400).send({
            msg: "Erro ao buscar ações!",
            error: err
        })
    }
})

router.get('/:id', login,async (req, res, next) =>{
    const id = req.params.id;
    try{
        const result = await acoesServices.getAcoesId(id);
        return res.status(200).send({
            msg: "Lista",
            result: result  
        })
    }catch(err){
        res.status(400).send({
            msg: "Erro ao buscar ações!",
            error: err
        })    
    }
})
module.exports = router;