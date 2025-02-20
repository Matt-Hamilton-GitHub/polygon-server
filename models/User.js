const mongoose = require('mongoose')

const User = new mongoose.Schema({
    user_nick: {type: String, required: true, unique: true},
    password_hash: {type: String, required: true}
}, {timestamps: true})

module.exports = mongoose.model('User', User, 'Users')