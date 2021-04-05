const router = require('express').Router();
const onlyAuthMiddleware = require('../middleware/onlyAuth');
const userController = require('../controllers/userController');

router.get('/', [onlyAuthMiddleware], userController.getUser);

module.exports = router;
