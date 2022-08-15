const  jwt =require('jsonwebtoken');


exports.generateToken = (user) => {
    return jwt.sign(
      {
        _id: user._id,
        matricule: user.matricule,
        nom: user.nom,
        niveau : user.niveau,
        MDP: user.MDP,
        prenom: user.prenom,
        volumeForfait : user.volumeForfait,
        isAdmin : user.isAdmin,
        numTel:user.numTel,
        email:user.email

      },
      process.env.JWT_SECRET || 'somethingsecret',
      {
        expiresIn: '30d',
      }
    );
  };

exports.isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(
        token,
        process.env.JWT_SECRET || 'somethingsecret',
        (err, decode) => {
          if (err) {
            res.status(401).send({ message: 'Invalid Token' });
          } else {
            req.user = decode;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: 'No Token' });
    }
  };

  exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin Token' });
    }
  };
  