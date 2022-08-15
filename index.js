require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()
const db = require("./connection")
const cookieParser = require('cookie-parser')
const routes = require('./routes/routes')
var allowedOrigins = ['http://localhost:3000', 'http://localhost:6969'];
app.use(cookieParser())

app.use(cors({
    credentials: true, // cookies avalable in the front
    origin: function(origin, callback){
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));
  const PORT = 6969
app.use(express.json())

routes(app)


app.listen(PORT, console.log('Listening on port', PORT))