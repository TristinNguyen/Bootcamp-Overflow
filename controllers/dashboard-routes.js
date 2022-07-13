const router = require('express').Router();
const sequelize = require('../config/connection');
// req user to be logged in
const withAuth = require('../utils/auth');
const { Question, User, Answer, Vote } = require('../models');

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


// post a new answer to a post
router.post( '/answers/', (req, res) => {
  console.log('============ POST ANSWERS ROUTE /dashboard/answers/ ============')
  Answer.create({
    answer_text: req.body.answer_text,
    user_id: req.body.user_id,
    question_id: req.body.question_id
  })
  .then(dbAnswerData => res.json(dbAnswerData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  })

router.get('/add', (req, res) => {
  res.render('newquestion', { loggedIn: true });

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

      const question = dbQuestionData.get({ plain: true });
      console.log(question)
      // res.json(dbQuestionData);
      res.render('single-question', { question, loggedIn: true });
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

// upvote (votes technically alter the question's data)
router.put('/questions/:id/vote', withAuth, (req, res) => {
  console.log('========== dashboard upVote route ==========')
  // make sure the session exists first
  // upvotes should only work if someone is logged in
  console.log('route req.body: ', req.body)
  if (req.session.user_id) {
    // pass session id along with all destructured properties on req.body
    Question.vote({ question_id: req.body.question_id, user_id: req.session.user_id }, { Vote, Answer, User })
    .then(updatedVoteData => {
        console.log(updatedVoteData)

        res.json(updatedVoteData)
      })
      .catch(err => {
        console.log('============ VOTING ERROR ============')
        console.log(err);
        res.status(400).json({message: 'Duplicate votes not allowed'});
        // res.status(400).json({message: "Only one vote per person!"});
      });
  }
});



module.exports = router;
