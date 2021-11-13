const router = require('express').Router();
const programController = require('../app/controllers/programController');

router.post('/', programController.create);
router.get('/:id', programController.getById);
router.get('/', programController.getAll);

module.exports = router;
