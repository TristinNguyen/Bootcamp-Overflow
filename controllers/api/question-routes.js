const router = require('express').Router();
const { Op } = require ("sequelize")
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { Question, User, Vote, Answer } = require('../../models');

// get all questions
router.get('/', (req, res) => {
    console.log('========================');
    console.log('req.query', req.query);
    Question.findAll({
        order: [['created_at', 'DESC']],
        //query config
        attributes: [
        'id',
        'question_content',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE Question.id = vote.question_id)'), 'vote_count']
      ],
      include: [
        // include the Answer model here:
        {
          model: Answer,
          attributes: ['id', 'answer_text', 'question_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        // Include the User model here
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(data => {
      if (!data) {
        res.status(404).json({message: 'No Questions found'});
        return;
      }
      res.json(data);

    })
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get single question
router.get('/:id', (req, res) => {
    console.log(req);
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
        res.json(dbQuestionData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create a question
router.post('/', withAuth, (req, res) => {
    Question.create({
        title: req.body.title,
        question_content: req.body.question_content,
        user_id: req.session.user_id
    })
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// upvote (votes technically alter the question's data)
router.put('/vote', (req, res) => {
    console.log('============ Route /questions/vote ============');
    // make sure the session exists first
    // upvotes should only work if someone is logged in
    console.log(req.body);
    if (req.session.user_id) {
      // pass session id along with all destructured properties on req.body
        Question.vote({ question_id: req.body.question_id, user_id: req.session.user_id }, { Vote, Answer, User })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

module.exports = router;
