const router = require('express').Router();
const programController = require('../app/controllers/programController');
const auth = require('../app/middleware/auth');
const authFree = require('../app/middleware/authFree');

router.post('/', programController.create);
router.get('/progress', auth, programController.getProgress);
router.get('/:id', authFree, programController.getById);
router.get('/', authFree, programController.getAll);

module.exports = router;
