// import all models
const Question = require('./Question');
const User = require('./User');
const Vote = require('./Vote');
// const Comment = require('./Comment');

// create associations
User.hasMany(Question, {
  foreignKey: 'user_id'
});

Question.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});

// exports
module.exports = { User, Question, Vote };