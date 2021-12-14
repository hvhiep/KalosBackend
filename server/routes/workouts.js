const router = require('express').Router();
const workoutController = require('../app/controllers/workoutController');
const auth = require('../app/middleware/auth');
const authFree = require('../app/middleware/authFree');

router.post('/', workoutController.create);
router.post('/submit', auth, workoutController.submit);
router.get('/submit', auth, workoutController.getSubmitted);
router.get('/:id', authFree, workoutController.getById);
router.get('/', authFree, workoutController.getAll);

module.exports = router;
