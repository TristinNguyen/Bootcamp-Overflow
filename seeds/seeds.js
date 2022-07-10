const sequelize = require('/Users/93pik/Desktop/projects/2-Project/Bootcamp-Overflow/config/connection');

const { User, question } = require('/Users/93pik/Desktop/projects/2-Project/Bootcamp-Overflow/models');

User.bulkCreate([
  {
  username: 'Joe Doaks',
  email: 'jdoaks@gmail.com',
  password: 'smokingfool'
  },
  {
  username: 'Barry Sanders',
  email: 'lion_king@lions.com',
  password: 'score7'
  },
  {
  username: 'FunnyGuy',
  email: 'verry-funny@jokes.com',
  password: 'hahahaha'
  },
  {
  username: 'Humpty Dumpty',
  email: 'HD@aol.com',
  password: 'Oh-Whatta-Fall'
  },
  {
  username: 'Eric Cartman',
  email: 'You@suck.com',
  password: 'IHeartCartman'
  },
  {
  username: 'Ronald',
  email: 'ronnym@gmail.com',
  password: 'password123'
  },
])
  .catch(err => {
    console.log(err);
  });


  question.bulkCreate([
    {
    title: 'Why Me?',
    question_content: 'What is the meaning of life?',
    user_id: 1
    },
    {
    title: 'Chilli',
    question_content: 'What is the best way to cook someones parents?',
    user_id: 5
    },
    {
    title: 'what time is it?',
    question_content: 'Now is the time for all good men to come to the aid of their country',
    user_id: 2
    }
  ])
  .catch(err => {
    console.log(err);
  });