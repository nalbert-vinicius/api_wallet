const express = require('express');
const usuariosServices = require('../services/usuariosServices');
const router = express.Router();
const login = require('../middleware/login');
const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


router.post('/cadastrar', async (req, res, next) => {
    try{
        if(req.body.email && req.body.nome && req.body.senha){
            const data = req.body;
            var result = await Usuarios.find({"email": data.email});

            if(result.length == 0){
                var hash = await bcrypt.hash(data.senha, 10);
                const usuarios = new Usuarios({
                    nome: data.nome,
                    email: data.email,
                    senha: hash
                });
                usuarios.save();
                return res.status(201).send({
                   msg: "Usuario criado com sucesso",
                   Ok: true,
                   Obj: usuarios 
                })
            }else{
                return res.status(401).send({
                    msg: "E-mail já cadastrado!",
                    Ok: false
                })
            }          
        }else{
            res.status(401).send({
                msg: "Dados inválidos!",
                Ok: false
            })
        }
    }catch(err){
        return res.status(500).send({
            msg: "ERRO!",
            Ok: false,
            erro: err
       })
    }
})

router.patch('/atualizar/:id', login, async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    try{
        const result = await usuariosServices.atualizaUsuario(id ,data);
        return res.status(202).send({
            msg: "Usuário Atualizado com sucesso!",
            Ok: true,
            result: {
                _id: result._id,
                nome: result.nome,
                email: result.email
            }
        })
    }catch(err){
        return res.status(500).send({
            msg: "ERRO AO ATUALIZAR DADOS!",
            Ok: false,
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
            msg: "DELETADO COM SUCESSO!",
            Ok: true
        })
    }catch(err){
        return res.status(501).send({
            msg: "ERRO AO EXCLUIR!",
            Ok: false,
            err: err
        })
    }
});



//login
router.post('/login', async (req, res, next) => {
    const data = req.body;
    try{
        var usuario = await Usuarios.find({'email' : data.email});
        if(usuario.length <1){
            return res.status(401).send({
                msg: "Usuário não cadastrado!",
                Ok: false
            });
        }
        

        if(await bcrypt.compare(data.senha, usuario[0].senha)){
            let token = jwt.sign({
                _id: usuario[0]._id,
                email: usuario[0].email    
            }, process.env.JWT_KEY,
            {expiresIn: "24h"}
            )
           return res.status(200).send({
                msg: "Autenticado com sucesso!",
                Ok: true,
                Nome: usuario[0].nome,
                token: token,
           })
        }

        return res.status(401).send({
            msg: "Senha incorreta!",
            Ok: false
        })

    }catch(err){
        res.status(500).send({
            msg: "ERRO",
            Ok: false,
            erro: err
        })
    }  
})

router.post('/validate', login, (req, res, next) => {
    console.log(req)
    return res.status(200).send({
        msg: "Token valido!",
        Ok: true
    })
});


module.exports = router;
