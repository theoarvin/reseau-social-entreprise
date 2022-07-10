const express = require('express');

// la fonction Router()
const router = express.Router()

// importation du controllers/auth
const authCtrl = require('../controllers/auth');
// importation du controllers/user
const userCtrl = require('../controllers/user');

const apiLimiter = require('../middleware/rate-limit');
const controleEmail = require('../middleware/controleEmail');
const password = require('../middleware/password');
const auth = require ('../middleware/auth');

// auth
router.post('/signup',controleEmail,password, authCtrl.signup);
router.post('/login',apiLimiter, authCtrl.login);

// user
router.get('/',userCtrl.getAllUsers);
router.get('/:id',userCtrl.userInfo);
router.put('/disable/:id',auth,userCtrl.desactivateUser);
router.put('/admin/:id',userCtrl.adminUser)

module.exports = router;