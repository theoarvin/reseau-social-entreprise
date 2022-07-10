// importation de bcrypt pour hasher le password
const bcrypt = require('bcrypt');


const dotenv = require("dotenv");
dotenv.config();

// importation du model de la base de données 
const User = require('../models/User');

const jwt = require('jsonwebtoken');

// signup pour enregistrer le nouvel utilisateur dans la base de données
exports.signup = (req, res, next) => {

  bcrypt.hash(req.body.password, parseInt(process.env.SALT))// salt = 10 ( nombre de fois ou sera exécuté l'algorithme de hashage )
    .then(hash => {
      // ce qui v a être enregistré dans mangoDB
      const user = new User({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash
      });
      // envoyer le user dans la base de données 
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


// login pour s'identifier via la base de données
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      if (user.disable == true){
        return res.status(401).json({ error: 'Utilisateur désactivé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              `${process.env.TOKEN_SECRET}`,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

