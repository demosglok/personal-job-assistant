const router = require('express').Router();
const onlyAuthMiddleware = require('../middleware/onlyAuth');
const profileController = require('../controllers/profileController');

router.get('/', [onlyAuthMiddleware], profileController.getProfile);
router.post('/', [onlyAuthMiddleware], profileController.saveProfile);

module.exports = router;
