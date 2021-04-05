const router = require('express').Router();

const authRouter = require('./auth');
const usersRouter = require('./users');
const profileRouter = require('./profile');
const requestRouter = require('./request');

router.use('/auth', authRouter);
router.use('/user', usersRouter);
router.use('/profile', profileRouter);
router.use('/request', requestRouter);

module.exports = router;

// https://www.vuemastery.com/blog/vue-router-a-tutorial-for-vue-3/
