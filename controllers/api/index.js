const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const questionRoutes = require('./question-routes');
//const commentRoutes = require ('./comment-routes');

// add api prefixes
router.use('/users', userRoutes);
router.use('/questions', questionRoutes);
// router.use('/comments', commentRoutes);

module.exports = router;
