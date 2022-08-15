const User = require('../models/user.model')
const validation = require('../validation/register.validation')
const bcrypt = require('bcryptjs')
const { generateToken } =require('../utils.js')
const randomize = require("randomatic");
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const {sign, verify} = require('jsonwebtoken')
const mongoose = require('mongoose')

const accountSid = process.env.ACCOUNT_SID;
const authToken =process.env.AUTH_TOKEN;
const smsKey = process.env.SMS_SECRET_KEY;
let twilioNum = process.env.TWILIO_PHONE_NUMBER;

const generateRandomKey = () =>{
    let random = randomize("A0", 10); //will generate a 10-character, uppercase alpha-numeric randomized string
    random =
      random.slice(0, 3) + "-" + random.slice(3, 6) + "-" + random.slice(6, 10);
    console.log(random); 
}

const client = require('twilio')(accountSid, authToken);

const registerUser = async (req, res) => {
    const body = req.body
    const validationCheck = validation.validate(body)
    if(validationCheck.error) {
        return res.status(400).send(validationCheck.error.details);
    }

    const numTel = body.numTel
    const email = body.email
    const matricule = body.matricule

    const prepNum = await User.findOne({numTel: numTel})
    const prepMail = await User.findOne({email: email})
    const prepMatricule = await User.findOne({matricule: matricule})
  //  console.log((prepMatricule || prepMail || prepNum))

    if((prepMatricule || prepMail || prepNum)){
      res.status(400).send({message: "User already exist"})
      return
    }

    try {
        const newUser = User.create({
        matricule: body.matricule,
        nom: body.nom,
        niveau: body.niveau,
        MDP: await bcrypt.hash(body.MDP, 10),
        prenom: body.prenom,
        volumeForfait:body.volumeForfait,
        dureeForfait:body.dureeForfait,
        isAdmin:body.isAdmin,
        numTel: body.numTel,
        email: body.email    
        },
        ()=>generateRandomKey())
        res.send({
            message: "User created"
        })
    } catch (error) {
        res.send({
            error,
            message: "Failed to REGISTER"
        })
    }
}

const getUser = async (req, res) => {
    try {
       const users = await User.find()
        res.send(users)
    } catch (error) {
        res.send({
            error,
            message: "Error/"
        })
    }
}

const signing= async (req, res) => {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.MDP, user.MDP)) {

            // createAuthToken2
        const {MDP,...payload} = user
        const secretK = process.env.SECRET_KEY || 'somethingsecret'
        const token2 = sign(payload, secretK)
        res.cookie('TKNcookie', token2, {
          httpOnly: true, 
          maxAge: 24*60*60*1000 //1jr
        })
        console.log('cookie set')
            // end of token creation


              //forfait verification
          const forfait = user.volumeForfait * user.dureeForfait
          if(forfait < 100) {
            console.log('Forfait insuffisant')
              return res.send({                
                message: "!!Forfait insuffisant!!",
                _id: user._id,
                matricule: user.name,
                prenom : user.prenom,
                isAdmin: user.isAdmin,
                email: user.email,
                token: generateToken(user)
              })
          }
         

          res.send({
            _id: user._id,
            matricule: user.name,
            prenom : user.prenom,
            isAdmin: user.isAdmin,
            email: user.email,
            token: generateToken(user),
          });

                
        const phone = `${user.numTel}`;
        const otp = Math.floor(100000 + Math.random() * 900000);//generate OTP
        const ttl = 2 * 60 *1000; //OTP expire time
        let expires = Date.now();
        expires+=ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = crypto.createHmac('sha256','secret').update(data).digest('hex');
        const fullHash = `${hash}.${expires}`;

        client.messages
        .create({
          body: `Le mot de passe est  ${otp}`,
          from: twilioNum,
          to: phone,
        })
        .then((messages) => {
          res.status(200).json({ phone, hash: fullHash, otp });
        })
        .catch((err) => {
          //console.error("phone : ", err.message);
          return res.json({ error: err.message });
        });

    }
          //sendMessage();
          return ;
        }
        res.status(401).send({ message: 'Invalid email or password' });
      }
      
    



const viewUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        res.status(200).send(user)
    } catch (error) {
        res.send({
            error,
            message: "Error/"
        })
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id
    const body = req.body
    const data = {
    matricule: body.matricule,
    nom: body.nom,
    niveau: body.niveau,
    MDP: await bcrypt.hash(body.MDP, 10),
    volumeForfait: req.body.volumeForfait,
    dureeForfait: req.body.dureeForfait,
    prenom: body.prenom,
    numTel: body.numTel,
    email: body.email   
    }
    try {
        const user = await User.findById(id)
        await user.updateOne(data)
        const updatedUser = await User.findById(id)
        res.status(200).send(updatedUser)
    } catch (error) {
        res.send({
            error,
            message: "Error/"
        })
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        await User.findByIdAndDelete(id)
        const user0 = await User.findById(id)
        res.status(200).send(user0)
    } catch (error) {
        res.send({
            error,
            message: "Error/"
        })
    }
}

const upDateForfait = async (req, res) => {
    // get user
    const jwtCookie = req.cookies['TKNcookie'];
    const payload = verify(jwtCookie, process.env.SECRET_KEY)

    if(!payload) {
      res.send('Unathenticated')
    }

    const id = payload._doc._id
    const user = await User.findById(id)

  //  update forfait
    try {
      await user.update({
        dureeForfait: req.body.dureeForfait
      })
      console.log('updated forfait')
      const user2 = await User.findById(id)
      res.send(user2)
    } catch (error) {
      res.send({
        error: error,
        message:"Internal error/ Unable to update"
      })
    }
}

const searchUser = async (req, res) => {
  const keyword = req.body.keyword
  const users = await User.find().or([
      { nom:  {$regex: keyword, $options: 'i'} },
      { prenom: {$regex: keyword, $options: 'i'} },
      { email: {$regex: keyword, $options: 'i'} },
      { matricule : keyword}
    ])  

  if((users.length != 0)){ return res.send(users)}
  try {
    const newkey = mongoose.Types.ObjectId(keyword.trim())
    const userById = await User.findById(newkey)
    if(userById.length != 0){ return res.send(userById)}
      res.send({message: "no user found"})
  } catch (error) {
    return  res.send({message: "no user found"})
  }

  res.send({message: "no user found"})
}


const userFonctions = {
    registerUser: registerUser,
    signing : signing,
    getUser: getUser,
    viewUser: viewUser,
    generateRandomKey : generateRandomKey,
    updateUser: updateUser,
    deleteUser: deleteUser,
    upDateForfait: upDateForfait,
    searchUser:searchUser
}

module.exports = userFonctions

