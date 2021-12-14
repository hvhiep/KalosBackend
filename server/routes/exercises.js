const router = require('express').Router();
const exerciseController = require('../app/controllers/exerciseController');
const authFree = require('../app/middleware/authFree');

router.post('/', exerciseController.create);
router.get('/:id', authFree, exerciseController.getById);
router.get('/', authFree, exerciseController.getAll);

module.exports = router;
