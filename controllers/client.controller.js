const Client = require('../models/clients.model')
const mongoose = require('mongoose')
const Banque = require('../models/banque.model')
const Pret = require('../models/pret.model')

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

// const deleteClient = async (req, res) => {
//     const id = req.params.id
//     try {
//         await Client.findByIdAndDelete(id)
//         const updatedClient = await Client.findById(id)
//         res.status(200).send(updatedClient)
//     } catch (error) {
//         res.send({
//             error,
//             message: "Error/"
//         })
//     }
// }

const deleteClient = async (req, res) => {
    const id = req.params.id
    try {
        const oldClient = await Client.findById(id) 
         console.log("01 : => " + oldClient)

        const prets = oldClient.pret 

         console.log("02 : => " + prets)
        console.log("03 pret;lenght" + prets.length)

        if(prets.length != 0){   
            for (let i = 0; i < prets.length; i++){
                console.log("prets[i] " + prets[i])

                
                try {
                    const pretElement = await Pret.findById(prets[i])  

                    console.log("pretElement :4:" + pretElement)
                    if(pretElement){
                        const bank = await Banque.findById(pretElement.Banque)  
                        console.log("client ::5::" + bank + "::5::")
                        let bankPret = bank.pret
                        for (let j=0; j < bankPret.length; j++){
                            let pretID = prets[i].toString()

                            console.log("pretID  ::7::" +pretID+ " ::7::")

                            let bankPretJ = bankPret[j].toString()   
                            
                            console.log("pretID  ::7::" +pretID+ " ::7::"+"pretID  ::8::" +bankPretJ+ " ::8::")

                            if(bankPretJ == pretID){
                                console.log("ClientPret[j]  ::6::" +clientPret[j]+ " ::6::")
                                bankPret.splice(j, 1)
                            } else {
                                console.log("pretID  ::9::" +pretID+ " ::9::"+"pretID  ::9::" +bankPretJ+ " ::9::")
                            }
                        }
                        await bank.updateOne({
                            pret: bankPret
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