const router = require('express').Router();
const freeWorkoutController = require('../app/controllers/freeWorkoutController');

router.get('/', freeWorkoutController.getAll);

module.exports = router;
