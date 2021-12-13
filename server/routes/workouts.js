const router = require('express').Router();
const workoutController = require('../app/controllers/workoutController');
const auth = require('../app/middleware/auth');

router.post('/', workoutController.create);
router.post('/submit', auth, workoutController.submit);
router.get('/submit', auth, workoutController.getSubmitted);
router.get('/:id', workoutController.getById);
router.get('/', workoutController.getAll);

module.exports = router;
