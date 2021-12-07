const router = require('express').Router();
const videoController = require('../app/controllers/videoController');

router.post('/', videoController.create);
router.get('/:id', videoController.getById);
router.get('/', videoController.getAll);

module.exports = router;
