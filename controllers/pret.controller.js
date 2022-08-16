const Pret = require('../models/pret.model')
const Client = require('../models/clients.model')
const Banque = require('../models/banque.model')


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

const getZavatra = async(req,res)=>{
    const test = req.body.test;
    const date = new Date(test);
    const dateCopy = new Date(date.getTime());

    dateCopy.setDate(dateCopy.getDate() + 7);

// 👇️ Thu Apr 28 2022
console.log(dateCopy);

// 👇️ Thu Apr 21 2022 (didn't change original)
console.log(date);

    const minDate = new Date(date)
    const maxDate = new Date(dateCopy)

    // const pret = await Pret.find({
    //     "datePret": { "$gte" : minDate, "$lt" : maxDate }
    // })
    // console.log(" Pret" + pret + " date " + date)
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



module.exports = {
    createPret: createPret,
    getPret: getPret,
    viewPret: viewPret,
    updatePret: updatePret,
    deletePret: deletePret,
    getZavatra:getZavatra,
    versement: versement
}

