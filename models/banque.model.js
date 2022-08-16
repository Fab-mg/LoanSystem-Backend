const mongoose = require('mongoose')

const Schema = mongoose.Schema(
    {
        designation: {type: String},
        taux_pret: {type: Number},
        numBanque: {type: String, unique: true, dropDups: true},
        pret: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pret"
        }]
    },
    {
        timestamps: true
    }
)

const Banque = mongoose.model('Banque', Schema)
module.exports = Banque