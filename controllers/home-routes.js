const router = require("express").Router();
const res = require("express/lib/response");
const sequelize = require("../config/connection");
const withAuth = require('../utils/auth');
const { Question, User, Answer} = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);
  Question.findAll({
    attributes: [
      "id",
      "question",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE question.id = vote.question_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Answer,
        attributes: ["id", "answer_text", "question_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbQuestionData) => {
      // pass a single question object into the homepage template
      const questions = dbQuestionData.map((question) => question.get({ plain: true }));
      res.render("homepage", { questions });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/question/:id", withAuth, (req, res) => {
  const id2 = req.params.id

  Question.findOne({
    where: {
      id: id2
    },
    attributes: [
      'id',
      'question',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE question.id = vote.question_id)'), 'vote_count']
    ],
    include: [
      {
        model: Answer,
        attributes: [
          'id',
          'answer_text',
          'question_id',
          'user_id',
          'created_at'
        ],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      },
    ]
  })
  .then(dbQuestionData => {
    if(!dbQuestionData) {
      res.status(404).json({ message: 'No question found with this id' });
      return;
    }
    const question = dbQuestionData.get({plain: true});
    res.render('single-question', { question, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
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