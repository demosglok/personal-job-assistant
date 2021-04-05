const router = require('express').Router();
const authController = require('../controllers/authController');


router.get('/facebook', authController.facebook);
router.get('/facebook-callback', authController.facebookCallback);

router.get('/google', authController.google);
router.get('/google-callback', authController.googleCallback);

router.get('/github', authController.github);
router.get('/github-callback', authController.githubCallback);

router.get('/linkedin', authController.linkedin);
router.get('/linkedin-callback', authController.linkedinCallback);

router.get('/logout', authController.logout);

module.exports = router;
