const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// création du modèle de données pour le login
const userShema = mongoose.Schema({
    pseudo: { type: String, maxLength: 10, required: true , unique: true},
    email: { type: String, required : true, unique: true },
    password: { type: String, required: true },
    disable: { type: Boolean, required: true, default: false},
    admin : { type: Boolean, required: true, default: false}
});

// securité pour ne pas enregistrer 2 fois la même donnée
userShema.plugin(uniqueValidator);

// exportation du modèle de données 
module.exports = mongoose.model('User', userShema);