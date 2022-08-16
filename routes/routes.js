const { Router } = require('express')
const clientFonctions = require('../controllers/client.controller')

const userFonctions = require('../controllers/user.controller')
const {adminSignin} = require('../controllers/admin.auth.controller')
const bankFonctions = require('../controllers/banque.controller')
const pretFonctions = require('../controllers/pret.controller')

const routes = (router = Router) => {

    router.post('/register', userFonctions.registerUser)
    router.get('/users', userFonctions.getUser)
    router.post('/users/signing',userFonctions.signing)
    router.get('/users/:id', userFonctions.viewUser)    
    router.put('/users/:id/update', userFonctions.updateUser)    
    router.delete('/users/:id/delete', userFonctions.deleteUser)

    router.post('/admin/sign-in', adminSignin)
    
    router.post('/updateForfait',userFonctions.upDateForfait)
    router.post('/search', userFonctions.searchUser)

    //CLIENT    
    router.post('/client/create', clientFonctions.createClient)
    router.get('/client/list', clientFonctions.getClient)
    router.get('/client/:id', clientFonctions.viewClient)
    router.put('/client/:id/update', clientFonctions.updateClient)
    router.delete('/client/:id/delete', clientFonctions.deleteClient)
    router.post('/client/search', clientFonctions.searchClient)

    //BANQUE
    router.post('/banque/create', bankFonctions.createBanque)
    router.get('/banque/list', bankFonctions.getBanques)
    router.get('/banque/:id', bankFonctions.viewBanque)
    router.put('/banque/:id/update', bankFonctions.updateBanque)
    router.delete('/banque/:id/delete', bankFonctions.deleteBanque)
    router.post('/banque/search', bankFonctions.searchBanque)

    //PRETS    
    router.post('/pret/create', pretFonctions.createPret)
    router.get('/pret/list', pretFonctions.getPret)
    router.get('/pret/:id', pretFonctions.viewPret)
    router.put('/pret/:id/update', pretFonctions.updatePret)
    router.delete('/pret/:id/delete', pretFonctions.deletePret)
    router.put('/pret/:id/versement', pretFonctions.versement)
    router.post('/pret/search', pretFonctions.searchPret)

    //CLIENT //BANQUE //PRET
    router.get('/client/:id/pretClient', clientFonctions.getClientPret)
    router.get('/banque/:id/pretBanque', bankFonctions.getBanquePret);

    router.post('/pret/getZavatra',pretFonctions.getZavatra)



}

module.exports = routes