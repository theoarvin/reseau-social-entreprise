// importation du model de la base de données 
const UserModel = require('../models/User');
const ObjectID = require('mongoose').Types.ObjectId;

exports.getAllUsers = async (req,res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users)
};

exports.userInfo =  (req,res) => {
   if(!ObjectID.isValid(req.params.id))
   return res.status(400).send('ID unknow :' + req.params.id)

   UserModel.findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log('ID unknow :' + err);
   }).select('-password');
};

exports.desactivateUser = (req,res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknow :' + req.params.id)
     UserModel.updateOne({ _id: req.params.id }, {  disable: true, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));  
};

exports.adminUser = (req,res) => {
   if(!ObjectID.isValid(req.params.id))
   return res.status(400).send('ID unknow :' + req.params.id)
    UserModel.updateOne({ _id: req.params.id }, {  admin: true, _id: req.params.id })
       .then(() => res.status(200).json({ message: 'Objet modifié !'}))
       .catch(error => res.status(400).json({ error }));  
};