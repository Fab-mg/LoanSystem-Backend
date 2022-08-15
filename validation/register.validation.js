const { Joi } = require('express-validation');

const registerValidation = Joi.object({
        matricule: Joi.string().required(),
        nom: Joi.string().required(),
        niveau: Joi.string().required(),
        MDP: Joi.string().required(),
        prenom: Joi.string().required(),
        volumeForfait: Joi.number(),
        dureeForfait: Joi.number(),
        isAdmin:Joi.bool(),
        numTel: Joi.string().required(),
        email: Joi.string().email().required()
})

module.exports = registerValidation