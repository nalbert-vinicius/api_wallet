const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)

const connectionString = process.env.MONGO_DB;

const conexao = mongoose.connect(connectionString, (error) =>{
    if(!error){
        console.log("MongoDB Atlas conectado com sucesso!");
    }else{
        console.log("Erro de conexão!", error)
    }
})
exports.conexao = conexao;

