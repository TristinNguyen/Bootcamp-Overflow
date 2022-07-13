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


router.get("/login", (req, res) => {
  // redirect home if no one exists upon login
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("/");
});

module.exports = router;