const router = require('express').Router();

const authRouter = require('./auth');
const usersRouter = require('./users');

router.use('/auth', authRouter);
router.use('/user', usersRouter);

module.exports = router;

// https://www.vuemastery.com/blog/vue-router-a-tutorial-for-vue-3/
