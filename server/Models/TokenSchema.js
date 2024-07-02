const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    userID:{
        type:String,
        ref:'users',
        required:true
    },
    token:{
        type:String,
        required:true
    }
})

const Token = mongoose.model('tokens',TokenSchema);

module.exports = Token;