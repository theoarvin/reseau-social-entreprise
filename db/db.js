//importer le package pour utiliser les variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
//importation de la base de données 
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.DB_USER_PASS}@cluster0.1ch0yg8.mongodb.net/Groupomania?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !' + error));

  module.exports = mongoose;