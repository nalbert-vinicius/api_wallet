const express = require('express');
const usuariosServices = require('../services/usuariosServices');
const router = express.Router();
const login = require('../middleware/login');


router.post('/cadastrar', async (req, res, next) => {
    try{
        if(req.body.email && req.body.nome && req.body.senha){
            const data = req.body;
            const result = await usuariosServices.cadastroUsuario(data);
            return res.status(201).send({
                msg: "Usuário criado com sucesso!",
                result: {
                    nome: result.nome,
                    email: result.email
                }
            })
        }else{
            res.status(400).send({
                msg: "Dados inválidos!"
            })
        }
    }catch(err){
        return res.status(400).send({
            msg: "E-mail já cadastrado!",
            erro: err
       })
    }
})

router.patch('/atualizar/:id', login, async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    if(data.email == '' || data.nome === '' || id == ''){
        return res.status(400).send({
            msg: "DADOS INVÁLIDOS",
            result: {
                nome: data.nome,
                email: data.email
            }
        })
    }
    try{
        const result = await usuariosServices.atualizaUsuario(id ,data);
        if(result !="ERRO!"){
            return res.status(201).send({
                msg: "Usuário Atualizado com sucesso!",
                obj: {
                    result: {
                        _id: result._id,
                        nome: result.nome,
                        email: result.email
                    }
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
router.delete('/apagar/:id', login, (req, res, next) => {
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
            msg: "Falha na autenticação!",
            erro: err
        })
    }  
})
module.exports = router;
