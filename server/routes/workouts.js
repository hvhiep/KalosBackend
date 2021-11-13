const router = require('express').Router();
const workoutController = require('../app/controllers/workoutController');

router.post('/', workoutController.create);
router.get('/:id', workoutController.getById);
router.get('/', workoutController.getAll);

module.exports = router;
