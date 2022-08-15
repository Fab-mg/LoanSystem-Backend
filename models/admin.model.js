const mongoose = require('mongoose')

const Schema = mongoose.Schema(
    {
        nom: {type: String},
        MDP: {type: String},
        prenom: {type: String},
        isAdmin: { type: Boolean, default: true},
        email:{type: String, unique: true, dropDups: true}
    },
    {
        timestamps: true
    }
)

const Admin = mongoose.model('Admin', Schema)
module.exports = Admin