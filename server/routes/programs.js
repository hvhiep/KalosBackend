const router = require('express').Router();
const programController = require('../app/controllers/programController');
const auth = require('../app/middleware/auth');

router.post('/', programController.create);
router.get('/progress', auth, programController.getProgress);
router.get('/:id', programController.getById);
router.get('/', programController.getAll);

module.exports = router;
