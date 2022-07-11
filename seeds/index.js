const seedUsers = require('./user-seeds');
const seedQuestions = require('./question-seeds');
const seedAnswers = require('./answer-seeds');
const seedVotes = require('./vote-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedQuestions();
  console.log('--------------');

  await seedAnswers();
  console.log('--------------');

  await seedVotes();
  console.log('--------------');

  process.exit(0);
};

seedAll();
