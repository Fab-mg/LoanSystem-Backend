const mongoose = require('mongoose')
require('dotenv').config()

const connectionParams = {
    useNewUrlParser : true,
//    useCreateIndex: true,
    useUnifiedTopology: true
}

const uri = 'mongodb+srv://'+process.env.MONGO_USER+':'+process.env.MONGO_PASS+'@loanmanagement.8e8coii.mongodb.net/?retryWrites=true&w=majority' 
// || 'mongodb+srv://'+process.env.MONGO_USER+':'+process.env.MONGO_PASS+'@cluster0.ejgyaqn.mongodb.net/?retryWrites=true&w=majority'

const conn = mongoose.connect(uri, connectionParams).then(console.log("connected to database"))
.catch((err)=> console.log(err))

module.exports = conn