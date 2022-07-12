const router = require('express').Router();
const sequelize = require('../config/connection');
// req user to be logged in
const withAuth = require('../utils/auth');
const { Question, User, Answer } = require('../models');

// GET dashboard page
router.get('/', withAuth, (req, res) => {
  console.log('========== dashboard root route ==========')
  // console.log(req.query);

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

// get single question
router.get('/questions/:id', (req, res) => {
  console.log('========== dashboard single question route ==========')
  // console.log(req);
  Question.findOne({
      where: {
          id: req.params.id
      },
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
      if (!dbQuestionData) {
          res.status(404).json({ message: 'No question found with this id' });
          return;
      }
      // res.json(dbQuestionData);
      // serialize data before passing to template
      const single_question = dbQuestionData.get({ plain: true });
      // let single_question = dbQuestionData.map(single_question => single_question.get({ plain: true }));
      // console.log(single_question)
      // res.json(single_question);
      res.render('single-question', { single_question, loggedIn: true });
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
