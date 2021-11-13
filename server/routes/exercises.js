const router = require('express').Router();
const exerciseController = require('../app/controllers/exerciseController');

router.post('/', exerciseController.create);
router.get('/:id', exerciseController.getById);
router.get('/', exerciseController.getAll);

module.exports = router;
