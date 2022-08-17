const Banque = require('../models/banque.model')
const mongoose = require('mongoose')
const Pret = require('../models/pret.model')
const Client = require('../models/clients.model')

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
        const oldBanque = await Banque.findById(id) //FIND BANK TO REMOVE

        // console.log("01 : => " + oldBanque)

        const prets = oldBanque.pret //GET LIST OF LOAN FROM BANK

        // console.log("02 : => " + prets)
        // console.log("03 pret;lenght" + prets.length)

        if(prets.length != 0){   //CHECK IF BANK HAS LOAN
            for (let i = 0; i < prets.length; i++){
                // console.log("prets[i] " + prets[i])

                //REMOVING LOAN FROM CLIENTS TABLES RECORD
                try {
                    const pretElement = await Pret.findById(prets[i])   // TRYCATCH IF THERE IS ERROR FROM ID

                    // console.log("pretElement :4:" + pretElement)
                    if(pretElement){
                        const client = await Client.findById(pretElement.Client)     // GET CLIENT WHO HAS LOAN 1 By 1
                        // console.log("client ::5::" + client + "::5::")
                        let clientPret = client.pret
                        for (let j=0; j < clientPret.length; j++){
                            let pretID = prets[i]

                            // console.log("pretID  ::7::" +pretID+ " ::7::")
                            // console.log("pretID  ::8::" +clientPret[j]+ " ::8::")

                            let clientPretJ = clientPret[j].toString()      //CAST TO STRING FOR COMPARISON BECAUSE IT IS AN OBJECT ID
                            if (clientPretJ == pretID) {
                                // console.log("ClientPret[j]  ::6::" +clientPret[j]+ " ::6::")
                                clientPret.splice(j, 1)
                            }
                        }
                        await client.updateOne({
                            pret: clientPret
                        })

                        console.log('removed pret from client successfully!')
                    }
                    

                        //removing pret
                    await Pret.findByIdAndDelete(prets[i])
    
                    } catch (error) {
                        console.log("keep going on i = "+i + "err" +error)
                    }

            }
        }

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