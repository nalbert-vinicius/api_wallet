const express = require('express');
const router = express.Router();
const acoesServices = require('../services/acoesService');

router.post('/cadastrar', async (req, res, next) => {
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


module.exports = router;