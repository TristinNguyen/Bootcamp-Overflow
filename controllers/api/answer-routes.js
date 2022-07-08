const router = require('express').Router();
const { Answer } = require('../../models');

router.get('/', (req, res) => {
  Answer.findAll()
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post( '/', (req, res) => {
  Answer.create({
    answer_text: req.body.answer_text,
    user_id: req.body.user_id,
    question_id: req.body.question_id
  })
  .then(data => res.json(data))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.delete('/:id', (req, res) => {
  Answer.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'No comment found with this id!' });
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