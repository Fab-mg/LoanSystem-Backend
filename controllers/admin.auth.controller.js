const Admin = require('../models/admin.model')
const bcrypt = require('bcryptjs');
const {generateToken} = require('../utils')

exports.adminSignin = async (req, res) => {
    const user = await Admin.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.MDP, user.MDP)) {
        const data = {
            token: generateToken(user),
            user: user
        }
        res.send(data)
      }
    }
    else {
        res.send({message: 'Invalid credentials'})
    }
}