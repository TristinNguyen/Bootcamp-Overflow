// import all models
const Question = require('./Question');
const User = require('./User');
// const Vote = require('./Vote');
// const Comment = require('./Comment');

// create associations
User.hasMany(Question, {
  foreignKey: 'user_id'
});

Question.belongsTo(User, {
  foreignKey: 'user_id'
});


// exports
module.exports = { User, Question };