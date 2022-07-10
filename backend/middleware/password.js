const passwordValidator = require('password-validator');

// création du schéma
const passwordSchema = new passwordValidator();

// schéma que doit respecter le mot de passe
passwordSchema
.is().min(3)                                    
.is().max(64)                                                                 
.has().not().spaces()   

// vérification du password par rapport au schéma 
module.exports = (req, res, next) => {
   if(passwordSchema.validate(req.body.password)){
      next();
   }else{
       return res.status(400).json({error : `le mot de passe n'est pas assez fort ${passwordSchema.validate('req.body.password', { list : true})}`})
   }
}

/*
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
*/