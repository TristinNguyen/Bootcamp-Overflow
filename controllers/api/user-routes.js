const router = require('express').Router();
// const { User, Post, Comment, Vote } = require('../../models');
const { User, Question, Vote } = require('../../models');


// GET all users: /api/users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a single user: /api/users/1
router.get('/:id', (req, res) => {
// access User model & find read singular ID
// read as SELECT * FROM users WHERE ID = i
  User.findOne({
    // keep user password private
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Question,
        attributes: [['id', 'question id'], 'title', 'question', 'created_at']
      },
      {
        model: Question,
        attributes: ['title'],
        through: Vote,
        as: 'voted_questions'
      }
    ]
  })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// POST - create user: /api/usrs
router.post('/', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST - user login: /api/login
router.post('/login', (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(data => {
    if (!data) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = data.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    res.json({ user: data, message: 'You are now logged in!' });
  });
});

// PUT - updatea a user: /api/users/1
router.put('/:id', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      if (!data[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'No user found with this id' });
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
