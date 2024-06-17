const mongoose = require('mongoose');

const Produto = mongoose.model('Produto', {
    id: { type: Number, required: true, unique: true }, 
    nome: String ,
    desc: String,
    tipo: String ,
    cor: String ,
    peso: Number,
    preco: Number,
    Data: Number,
});

module.exports = Produto;