const mongoose = require('mongoose')

const CabinScheme = new mongoose.Schema({
    name: {type: String, required: true },
    price: {type: Number, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    tags: {type: Array}

}, {timestamps: true})


module.exports = mongoose.model('Cabin', CabinScheme, 'Cabins')