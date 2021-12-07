const router = require('express').Router();
const userController = require('../app/controllers/userController');
const auth = require('../app/middleware/auth');

router.get('/me', auth, userController.getMe);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.put('/me/name', auth, userController.updateName);
router.put('/me/information', auth, userController.updateInformation);
router.post('/me/favorite/videos', auth, userController.favoriteVideo);
router.get(
    '/me/favorite/videos/:idVideo',
    auth,
    userController.getFavoriteVideoById
);
router.get('/me/favorite/videos', auth, userController.getFavoriteVideo);

module.exports = router;
