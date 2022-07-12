const router = require('express').Router();
const sequelize = require('../config/connection');
// req user to be logged in
const withAuth = require('../utils/auth');
const { Question, User, Answer } = require('../models');

// GET dashboard page
router.get('/', withAuth, (req, res) => {
  console.log(req.query);

    Question.findAll({
      // order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'question_content',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE question.id = vote.question_id)'), 'vote_count']
      ],
      include: [
        {
          model: Answer,
          attributes: ['id', 'answer_text', 'question_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbQuestionData => {
    // serialize data before passing to template
    const questions = dbQuestionData.map(question => question.get({ plain: true }));
    console.log(questions)
    res.render('dashboard', { questions, loggedIn: true });
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

// edit question
router.get('/edit/:id', withAuth, (req, res) => {
    Question.findByPk(req.params.id, {
      attributes: [
        'id',
        'question_content',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE question.id = vote.question_id)'), 'vote_count']
      ],
      include: [
        {
          model: Answer,
          attributes: ['id', 'answer_text', 'question_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbQuestionData => {
        if (dbQuestionData) {
          const question = dbQuestionData.get({ plain: true });
          
          res.render('edit-question', {
            question,
            loggedIn: true
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

module.exports = router;
