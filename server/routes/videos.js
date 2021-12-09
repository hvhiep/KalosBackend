const router = require('express').Router();
const videoController = require('../app/controllers/videoController');
const authFree = require('../app/middleware/authFree');

router.post('/', videoController.create);
router.get('/:id', videoController.getById);
router.get('/', authFree, videoController.getAll);

module.exports = router;
