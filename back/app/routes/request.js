const router = require('express').Router();
const onlyAuthMiddleware = require('../middleware/onlyAuth');
const requestController = require('../controllers/requestController');

router.get('/', [onlyAuthMiddleware], requestController.getRequests);
router.post('/', requestController.saveRequest);

module.exports = router;
