const Pret = require('../models/pret.model')
const Client = require('../models/clients.model')
const Banque = require('../models/banque.model')
const mongoose = require('mongoose')


const createPret = async (req, res) => {
    const body = req.body
    try {
        await Pret.create({
            montant: body.montant,
            datePret: body.datePret,
            Banque: body.Banque,
            Client: body.Client,
            numPret: body.numPret
        })
            const pret = await Pret.findOne({numPret: body.numPret})
            if(pret) {
                //Create pret in Client.pret
                const clientId = pret.Client
                const client = await Client.findById(clientId)
                console.log(client)
                await client.updateOne({
                    $push: { pret: pret }
                })

                //Create pret in Banque.pret
                const banqueId = pret.Banque
                console.log(banqueId)
                const banque = await Banque.findById(banqueId)
                console.log(banque)
                await banque.updateOne({
                    $push: { pret: pret }
                })

                return res.send(pret)
            }
            return res.send({
                error,
                message: "Erreur d'enregistrement"
            })
    } catch (error) {
        res.send({
            error,
            message: "Internal Error"
        })
    }
}

const getPret = async (req, res) => {
    try {
        const pret = await Pret.find().populate("Banque").populate("Client")
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

const viewPret = async (req, res) => {
    const id = req.params.id
    try {
        const pret = await Pret.findById(id).populate("Banque").populate("Client")
        if(pret) {
            return res.send(pret)
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

const updatePret = async (req, res) => {
    const id = req.params.id
    const data = {
        montant: req.body.montant,
        datePret: req.body.datePret,
        Banque: req.body.Banque,
        Client: req.body.Client,
    }
    try {
        const pret = await Pret.findById(id)
        await pret.updateOne(data)
        const updatedpret = await Pret.findById(id).populate("Banque").populate("Client")
        res.status(200).send(updatedpret)
    } catch (error) {
        res.send({
            error,
            message: "Error/"
        })
    }
}

const deletePret = async (req, res) => {
    const id = req.params.id
    const pret = await Pret.findById(id)
    try {
        //removing pret from client
        const client = await Client.findById(pret.Client)
        console.log(client)
        let clientPret = client.pret
        for (let i=0; i < clientPret.length; i++){
            if (clientPret[i] == id) {
                clientPret.splice(i, 1)
            }
        }
        await client.updateOne({
            pret: clientPret
        })
        console.log('removed pret from client successfully!')

        //removing pret from banque
        const banque = await Banque.findById(pret.Banque)
        console.log(banque)
        let banquePret = banque.pret
        for (let i=0; i < banquePret.length; i++){
            if (banquePret[i] == id) {
                banquePret.splice(i, 1)
            }
        }
        await banque.updateOne({
            pret: banquePret
        })
        console.log('removed pret from banque successfully!')

        //removing pret record
        await Pret.findByIdAndDelete(id)
        const updatedPret = await Pret.findById(id)
        res.status(200).send(updatedPret)

    } catch (error) {
        res.send({
            error,
            message: "Error/"
        })
    }
}

const pretEntreDate = async(req,res)=>{
    const minDatePrep = req.body.minDate;
    const maxDatePrep = req.body.maxDate;
    const date = new Date(minDatePrep);
    const dateEnd = new Date(maxDatePrep);
    const dateCopy = new Date(date.getTime());

    dateCopy.setDate(dateCopy.getDate() + 7);

// console.log(dateCopy);
// console.log(date);

    const minDate = new Date(date)
    const maxDate = new Date(dateEnd)

    const pretsFound = await Pret.find({"datePret": {"$gte": minDate, "$lt": maxDate}}).populate("Client").populate("Banque")

    return res.send(pretsFound)

    // const pret = await Pret.find({
    //     "datePret": { "$gte" : minDate, "$lt" : maxDate }
    // })
    // console.log(" Pret" + pret + " date " + date)
}


const getPretByMonth = async(req,res)=>{
    const minDatePrep = req.body.minDate;
    const maxDatePrep = req.body.maxDate;
    const date = new Date(minDatePrep);
    const dateEnd = new Date(maxDatePrep);
    const dateCopy = new Date(date.getTime());

    dateCopy.setDate(dateCopy.getDate() + 7);

// console.log(dateCopy);
// console.log(date);

    const minDate = new Date(date)
    const maxDate = new Date(dateEnd)

    const pretsFound = await Pret.find({"datePret": {"$gte": minDate, "$lt": maxDate}}).populate("Client").populate("Banque")

    return res.send(pretsFound)

    // const pret = await Pret.find({
    //     "datePret": { "$gte" : minDate, "$lt" : maxDate }
    // })
    // console.log(" Pret" + pret + " date " + date)
}


const getPretByYM = async (req,res) => {

    const minDatePrep = req.body.minDate;
    const date = new Date(minDatePrep);

    const data = await Pret.aggregate([{
        $group: {
            datePret : { year: { $year : date }, month: { $month : date }},
            results: {$push: '$$ROOT'}
        }}])

        res.send(data)
}

//Grouper par banque et montrer somme des prets
const groupAndSum = async (req,res) => {
    const data = await Pret.aggregate([
        {$group : {_id:"$Banque", count:{$sum:"$montant"}}}
    ])

    //populating the agragation manualy
    let dataArray = []
    for(let i = 0; i < data.length; i++){
        const banque = await Banque.findById(data[i]._id)
        if(banque){
            const effectif = banque.pret.length
            const montantPTG = (banque.taux_pret * data[i].count)/100 + (data[i].count)
            let item = {
                Id: banque._id,
                banque: banque.designation,
                montant: data[i].count,
                effectif: effectif,
                montantPTG: montantPTG
            }
            dataArray.push(item)
        }        
    }
    return res.send(dataArray)
}

const versement = async (req,res) => {
    const id = req.params.id    
    const versement = req.body.versement
    const pret = await Pret.findById(id)

    const montantRestant = pret.montant - versement
    await pret.updateOne({
        montant: montantRestant
    })
    res.send(await Pret.findById(id))
}

const searchPret = async (req, res) => {
    const keyword = req.body.keyword
  const prets = await Pret.find().or([
      { numPret:  {$regex: keyword, $options: 'i'} }
    ])  

  if((prets.length != 0)){ return res.send(prets)}
  try {
    const newkey = mongoose.Types.ObjectId(keyword.trim())
    const pretsById = await Pret.findById(newkey)
    if(pretsById.length != 0){ return res.send(pretsById)}
    res.send({message: "no Prets found"})
  } catch (error) {
    return  res.send({message: "Internal error"})
  }

  res.send({message: "no Prets found"})
}


module.exports = {
    createPret: createPret,
    getPret: getPret,
    viewPret: viewPret,
    updatePret: updatePret,
    deletePret: deletePret,
    pretEntreDate: pretEntreDate,
    versement: versement,
    searchPret: searchPret,
    getPretByYM: getPretByYM,
    groupAndSum: groupAndSum
}

