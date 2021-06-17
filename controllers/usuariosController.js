const express = require('express');
const usuariosServices = require('../services/usuariosServices');
const router = express.Router();
const login = require('../middleware/login');


router.post('/cadastrar', login , async (req, res, next) => {
    const data = req.body;
    try{
    const result = await usuariosServices.cadastroUsuario(data);
        return res.status(201).send({
            msg: "Usuário criado com sucesso!",
            obj: {
                result: result
            }
        })
    }catch(error){
        return res.status(400).send({
            msg: "DADOS INCORRETOS!",
            erro: error
       })
    }
})

router.patch('/atualizar/:id', async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    if(data.senha == '' || data.nome == '' || data.senha == ''){
        return res.status(400),send({
            msg: "DADOS INVÁLIDOS",
            obj: {
                result: data
            }
        })
    }
    try{
        const result = await usuariosServices.atualizaUsuario(id ,data);
        if(result !="ERRO!"){
            return res.status(201).send({
                msg: "Usuário Atualizado com sucesso!",
                obj: {
                    result: result
                }
            })
        }
    }catch(err){
        return res.status(400).send({
            msg: "ERRO AO ATUALIZAR DADOS!",
            error: err
       })
    }    
})

//remover
router.delete('/apagar/:id', (req, res, next) => {
    const id = req.params.id;
    try{
        const result = usuariosServices.removerUsuario(id);
        return res.status(201).send({
            msg: "DELETADO COM SUCESSO!"
        })
    }catch(err){
        return res.status(400).send({
            msg: "ERRO AO EXCLUIR",
            err: err
        })
    }
});

//login
router.post('/login', async (req, res, next) => {
    const data = req.body;
    try{
        const result = await usuariosServices.login(data);
        res.status(200).send({
        obj: {
            resultado: result
        } 
        })
    }catch(err){
        res.status(400).send({
            msg: "SENHA OU EMAIL INCORRETO!",
            erro: err
        })
    }  
})
module.exports = router;
