const mongoose = require('mongoose')

const Schema = mongoose.Schema(
    {
        montant: {type: Number},
        datePret: {
            type: Date, 
            default: new Date,
        //    min: '2022-08-00',
            max: new Date
        },
        Banque: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Banque"
        },
        Client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client"
        },
        numPret: {
            type: String, unique: true, dropDups: true
        }
    },
    {
        timestamps: true
    }
)

const Pret = mongoose.model('Pret', Schema)
module.exports = Pret