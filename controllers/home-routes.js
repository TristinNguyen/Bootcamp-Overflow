const router = require('express').Router();

router.get('/', (req, res) => {
if (!req.session.logged_in)
{
  res.render("login")
}
  res.render('homepage');
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;