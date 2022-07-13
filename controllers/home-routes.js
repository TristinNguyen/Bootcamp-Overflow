const router = require("express").Router();
const res = require("express/lib/response");
const sequelize = require("../config/connection");
const withAuth = require('../utils/auth');
const { Question, User, Answer} = require("../models");

// Home Route - Load Home Page - Login Not requried - no data required
router.get('/', (req, res) => {
  console.log("========== home-routes '/' ==========");
  res.render('homepage');
});

// allow a user to login or create a user-id
router.get("/login", (req, res) => {
  // redirect home if no one exists upon login
  if (req.session.loggedIn) {
    console.log('logged in')
    res.redirect("/");
    return;
  }
  res.render("/");
});

// allow user to log out if signed in
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
      req.session.destroy(() => {
          res.status(204).end();
      });
  }
  else {
      res.status(404).end();
  }
});

module.exports = router;