const Banque = require('../models/banque.model')
const mongoose = require('mongoose')

const createBanque = async (req, res) => {
    const body = req.body
    try {
        const create = await Banque.create({
            designation: body.designation,
            taux_pret: body.taux_pret,
            numBanque: body.numBanque
        })
        console.log(create)
        const banque = await Banque.findOne({designation: body.designation})
        return res.send(banque)
    } catch (error) {
        res.send({
            error,
            message: "Failed to create bank"
        })
    }
}

const getBanques = async (req, res) => {
    try {
        const banque = await Banque.find()
        res.send(banque)
    } catch (error) {
        res.send({
            error,
            message: "Error/"
        })
    }
}

const viewBanque = async (req, res) => {
    const id = req.params.id
    try {
        const banque = await Banque.findById(id)
        res.status(200).send(banque)
    } catch (error) {
        res.send({
            error,
            message: "Error/"
        })
    }
}

const updateBanque = async (req, res) => {
    const body = req.body
    const id = req.params.id
    const data = {
        designation: body.designation,
        taux_pret: body.taux_pret,
        numBanque: body.numBanque
    }
    try {
        const banque = await Banque.findById(id)
        await banque.updateOne(data)
        const updatedBanque = await Banque.findById(id)
        res.status(200).send(updatedBanque)
    } catch (error) {
        res.send({
            error,
            message: "Error/"
        })
    }
}

const deleteBanque = async (req, res) => {
    const id = req.params.id
    try {
        await Banque.findByIdAndDelete(id)
        const updatedBanque = await Banque.findById(id)
        res.status(200).send(updatedBanque)
    } catch (error) {
        res.send({
            error,
            message: "Error/"
        })
    }
}

const getBanquePret = async (req, res) => {
    try {
        const id = req.params.id
        const pret = await Banque.findById(id).populate("pret")
        if(pret) {
            return res.send(pret)
        }
        return res.send({
            error,
            message: "No bank yet"
        })
    } catch (error) {
        res.send({
            error,
            message: "Error/"
        })
    }
}

const searchBanque = async (req, res) => {
    const keyword = req.body.keyword
  const banques = await Banque.find().or([
      { designation:  {$regex: keyword, $options: 'i'} },
      { numBanque: {$regex: keyword, $options: 'i'} }
    ])  

  if((banques.length != 0)){ return res.send(banques)}
  try {
    const newkey = mongoose.Types.ObjectId(keyword.trim())
    const banquesById = await Banque.findById(newkey)
    if(banquesById.length != 0){ return res.send(banquesById)}
      res.send({message: "no bank found"})
  } catch (error) {
    return  res.send({message: "no bank found"})
  }

  res.send({message: "no bank found"})
}

module.exports = {
    searchBanque: searchBanque,
    createBanque: createBanque,
    getBanques: getBanques,
    viewBanque: viewBanque,
    updateBanque: updateBanque,
    deleteBanque: deleteBanque,
    getBanquePret: getBanquePret
}