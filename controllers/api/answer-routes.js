const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Answer, User } = require('../../models');

// get all answers
router.get('/', (req, res) => {
  Answer.findAll()
    .then(dbAnswerData => res.json(dbAnswerData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// ROUTE NOTE WORKING YET
// get all answers to a single question
router.get('/:id', (req, res) => {
  Answer.findAll({
    where: {
        id: req.params.id
    },
    attributes: [
        'id',
        'answer_text',
        'user_id',
        'created_at'
    ],
    include: [
        {
            model: User,
            attributes: ['username']
        }
    ]
  })
    .then(dbAnswerData => {
      if (!dbAnswerData) {
        res.status(404).json({ message: 'No answers found to that question' });
        return;
      }
      res.json(dbAnswerData);
      return;
    })

    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post a new answer to a post
router.post( '/', withAuth, (req, res) => {
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
});

// delete a comment but you must be igned in
router.delete('/:id', withAuth, (req, res) => {
  Answer.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbAnswerData => {
      if (!dbAnswerData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbAnswerData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;