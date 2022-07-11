const router = require('express').Router();

const userRoutes = require('./user-routes');
const questionRoutes = require('./question-routes');
const answerRoutes = require ('./answer-routes');


// add api prefixes
router.use('/users', userRoutes);
router.use('/questions', questionRoutes);
router.use('/answers', answerRoutes);

module.exports = router;
