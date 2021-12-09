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

router.post('/me/favorite/exercises', auth, userController.favoriteExercise);
router.get(
    '/me/favorite/exercises/:idExercise',
    auth,
    userController.getFavoriteExerciseById
);
router.get('/me/favorite/exercises', auth, userController.getFavoriteExercise);

router.post('/me/favorite/workouts', auth, userController.favoriteWorkout);
router.get(
    '/me/favorite/workouts/:idWorkout',
    auth,
    userController.getFavoriteWorkoutById
);
router.get('/me/favorite/workouts', auth, userController.getFavoriteWorkout);

router.post('/me/favorite/programs', auth, userController.favoriteProgram);
router.get(
    '/me/favorite/programs/:idProgram',
    auth,
    userController.getFavoriteProgramById
);
router.get('/me/favorite/programs', auth, userController.getFavoriteProgram);

module.exports = router;
