const router = require('express').Router();
const sequelize = require('../../config/connection');
// const { Question, User, Vote, Comment } = require('../../models');
const { Question, User } = require('../../models');

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
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE Question.id = vote.post_id)'), 'vote_count']
      ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Question.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'question',
      'created_at'
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Question.create({
    title: req.body.title,
    question: req.body.question,
    user_id: req.body.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.put('/upvote', (req, res) => {
//   // custom static method created in models/Question.js
//   Question.upvote(req.body, { Vote })
//     .then(updatedPostData => res.json(updatedPostData))
//     .catch(err => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

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
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
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
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
