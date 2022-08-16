const mongoose = require('mongoose')

const Schema = mongoose.Schema(
    {
        nom: {type: String},
        adresse: {type: String},
        numClient: {type: String, unique: true, dropDups: true},
        telClient: {type: String},
        email: {type: String, unique: true, dropDups: true},
        pret: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pret"
        }]
    },
    {
        timestamps: true
    }
)

const Client = mongoose.model('Client', Schema)
module.exports = Client