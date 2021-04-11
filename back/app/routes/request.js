const router = require('express').Router();
const onlyAuthMiddleware = require('../middleware/onlyAuth');
const requestController = require('../controllers/requestController');

router.get('/:timeperiod?', [onlyAuthMiddleware], requestController.getRequests);
router.get('/profileForRequest/:hash', requestController.getProfileForRequest);
router.post('/:hash', requestController.saveRequest);

module.exports = router;
