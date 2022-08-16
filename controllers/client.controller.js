const Client = require('../models/clients.model')
const mongoose = require('mongoose')

const createClient = async (req, res) => {
    const body = req.body
    try {
        const newClient = await Client.create({
            nom: body.nom,
            adresse: body.adresse,
            numClient: body.numClient,
            telClient: body.telClient,
            email: body.email
        })
            const client = await Client.findOne({email: body.email})
            if(client) {
                return res.send(client)
            }
            return res.send({
                error,
                message: "Failed to create client"
            })
    } catch (error) {
        res.send({
            error,
            message: "Internal Error"
        })
    }
}

const getClient = async (req, res) => {
    try {
        const clients = await Client.find()
        if(clients) {
            return res.send(clients)
        }
        return res.send({
            error,
            message: "No client yet"
        })
    } catch (error) {
        res.send({
            error,
            message: "Error/"
        })
    }
}

const viewClient = async (req, res) => {
    const id = req.params.id
    try {
        const client = await Client.findById(id)
        if(client) {
            return res.send(client)
        }
        return res.send({
            error,
            message: "Client ID err"
        })
    } catch (error) {
        res.send({
            error,
            message: "Error/"
        })
    }
}

const updateClient = async (req, res) => {
    const id = req.params.id
    const data = {
        nom: req.body.nom,
        adresse: req.body.adresse,
        telClient: req.body.telClient
    }
    try {
        const client = await Client.findById(id)
        await client.updateOne(data)
        const updatedClient = await Client.findById(id)
        res.status(200).send(updatedClient)
    } catch (error) {
        res.send({
            error,
            message: "Error/"
        })
    }
}

const deleteClient = async (req, res) => {
    const id = req.params.id
    try {
        await Client.findByIdAndDelete(id)
        const updatedClient = await Client.findById(id)
        res.status(200).send(updatedClient)
    } catch (error) {
        res.send({
            error,
            message: "Error/"
        })
    }
}

const getClientPret = async (req, res) => {
    try {
        const id = req.params.id
        const pret = await Client.findById(id).populate("pret")
        if(pret) {
            return res.send(pret)
        }
        return res.send({
            error,
            message: "No client yet"
        })
    } catch (error) {
        res.send({
            error,
            message: "Error/"
        })
    }
}

const searchClient = async (req, res) => {
    const keyword = req.body.keyword
  const clients = await Client.find().or([
      { nom:  {$regex: keyword, $options: 'i'} },
      { numClient: {$regex: keyword, $options: 'i'} },
      { email: {$regex: keyword, $options: 'i'} }
    ])  

  if((clients.length != 0)){ return res.send(clients)}
  try {
    const newkey = mongoose.Types.ObjectId(keyword.trim())
    const clientById = await Client.findById(newkey)
    if(clientById.length != 0){ return res.send(clientById)}
      res.send({message: "no client found"})
  } catch (error) {
    return  res.send({message: "no client found"})
  }

  res.send({message: "no client found"})
}

const clientFonctions = {
    createClient: createClient,
    getClient: getClient,
    viewClient: viewClient,
    updateClient: updateClient,
    deleteClient: deleteClient,
    getClientPret: getClientPret,
    searchClient:searchClient
}

module.exports = clientFonctions