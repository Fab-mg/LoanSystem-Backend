const mongoose = require('mongoose')

const Schema = mongoose.Schema(
    {
        matricule: {type: String, unique: true, dropDups: true},
        nom: {type: String},
        niveau: {type: String},
        MDP: {type: String},
        prenom: {type: String},
        volumeForfait: { type: Number, default: 500},
        dureeForfait: { type: Number, default: 1000*60*24},
        isAdmin: { type: Boolean, default: false},
        numTel: {type: String, unique: true, dropDups: true},
        email:{type: String, unique: true, dropDups: true}
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', Schema)
module.exports = User