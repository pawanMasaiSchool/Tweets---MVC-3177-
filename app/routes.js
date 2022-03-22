const express = require('express');
const router = express.Router();

const tweetController = require('./Controllers/tweet.controller');
const userController = require('./Controllers/user.controller');

router.use('/tweets', tweetController)
router.use('/users',userController)

module.exports = router