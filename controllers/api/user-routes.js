const router = require('express').Router();
const { User, Question, Answer, Vote } = require('../../models');


// GET all users: /api/users
router.get('/', (req, res) => {
  User.findAll({
    // keep password private when information is grabbed
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
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
        model: Answer,
        attributes: [
            'id',
            'answer_text',
        ],
        include: {
            model: Question,
            attributes: ['title']
        }
        }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
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
    .then(dbUserData => req.session.save (()=>{
      req.session.user_id=dbUserData.id;
      req.session.user_name=dbUserData.username;
      req.session.logged_in=true;
      res.json(dbUserData);
    }))
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
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
req.session.save (()=>{
  req.session.user_id=dbUserData.id;
  req.session.user_name=dbUserData.username;
  req.session.logged_in=true;
  res.json({ user: dbUserData, message: 'You are now logged in!' });
})

  });
});
// allow user to log out if signed in
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
      req.session.destroy(() => {
          res.status(204).end();
      });
  }
  else {
      res.status(404).end();
  }
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
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
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
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
