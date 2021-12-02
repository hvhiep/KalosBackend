const router = require('express').Router();
const userController = require('../app/controllers/userController');
const auth = require('../app/middleware/auth');

router.get('/me', auth, userController.getMe);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.put('/me/name', auth, userController.updateName);
router.put('/me/information', auth, userController.updateInformation);

module.exports = router;
