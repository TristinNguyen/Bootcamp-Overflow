const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Question, User, Answer, Vote } = require('../../models');

// get all questions
router.get('/', (req, res) => {
  console.log('======================');
    Question.findAll({
      order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'title',
        'question',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE Question.id = vote.question_id)'), 'vote_count']
      ],
      include: [
        // include the Answer model here:
        {
          model: Answer,
          attributes: ['id', 'Answer_text', 'question_id', 'user_id', 'created_at'],
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
        res.status(404).json({message: 'No Question found with this id'});
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET  - single question - /:id
router.get('/:id', (req, res) => {
  Question.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'question',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE Question.id = vote.question_id)'), 'vote_count']
    ],
    include: [
      // include the Anaswer model here:
      {
        model: Answer,
        attributes: ['id', 'Answer_text', 'question_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST -  create new question - /questions
router.post('/', (req, res) => {
  // expects {title: 'Chilli', question: 'best recipe', user_id: 5}
  Question.create({
    title: req.body.title,
    question: req.body.question,
    user_id: req.body.user_id
  })
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT - upvote - api/questions/upvote
router.put('/upvote', (req, res) => {
  // custom static method created in models/Question.js
  Question.upvote(req.body, { Vote })
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// PUT - update question 
router.put('/:id', (req, res) => {
  Question.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE question
router.delete('/:id', (req, res) => {
  Question.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
