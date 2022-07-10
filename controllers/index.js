//this collects and packages up all the API routes
const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');

//add API prefixes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
