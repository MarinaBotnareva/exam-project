const express = require('express');
const authRouter = require('./authRouter');
const chatRouter = require('./chatRouter');
const contestRouter = require('./contestRouter');
const offerRouter = require('./offerRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/auth', authRouter);

router.use('/contest', contestRouter);

router.use('/offer', offerRouter);

router.use('/user', userRouter);

router.use('/chat', chatRouter);

module.exports = router;
