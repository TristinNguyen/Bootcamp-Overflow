// import all models
const Question = require('./Question');
const User = require('./User');
const Vote = require('./Vote');
const Answer = require('./Answer');

// create associations
User.hasMany(Question, {
  foreignKey: 'user_id'
});

Question.belongsTo(User, {
  foreignKey: 'user_id'
});

User.belongsToMany(Question, {
  through: Vote,
  as: 'voted_questions',
  foreignKey: 'user_id'
});

Question.belongsToMany(User, {
  through: Vote,
  as: 'voted_questions',
  foreignKey: 'question_id'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id'
});

Vote.belongsTo(Question, {
  foreignKey: 'question_id'
});
User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Question.hasMany(Vote, {
  foreignKey: 'question_id'
});

Answer.belongsTo(User, {
  foreignKey: 'user_id'
});

Answer.belongsTo(Question, {
  foreignKey: 'question_id'
});

User.hasMany(Answer, {
  foreignKey: 'user_id'
});

Question.hasMany(Answer, {
  foreignKey: 'question_id'
});
// exports
module.exports = { User, Question, Vote, Answer };