const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { answer } = require('../../models');

router.get('/', (req, res) => {
  answer.findAll()
    .then(dbAnswerData => res.json(dbAnswerData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// post a new comment to a post
router.post( '/', withAuth, (req, res) => {
  answer.create({
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
  answer.destroy({
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