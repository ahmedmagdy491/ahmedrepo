const {Router} = require('express');

const authConreoller = require('../controllers/authController')

const router = Router();

router.get('/signup', authConreoller.signup_get);
router.post('/signup', authConreoller.signup_post);
router.get('/login', authConreoller.login_get);
router.post('/login', authConreoller.login_post);
router.get('/logout', authConreoller.logout_get);


module.exports = router;