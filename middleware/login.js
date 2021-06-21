const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try{
        //parametro no headers postman
        const token = req.headers.authorization.split(' ')[1];
        //decodifica o token/ a KEY gravada
        const decodifica = jwt.verify(token, process.env.JWT_KEY);
        //atribui os dados do usuário autenticado ao body
        var obj = {
            _id: decodifica._id,
            email: decodifica.email
        }
        req.body.usuario = obj;
        next();
    }catch(err){
        return res.status(401).send({
            msg: "Falha na autenticação do Token - JWT",
            erro: err
        })
    }
}