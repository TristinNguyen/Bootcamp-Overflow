// import all models
const Question = require('./Question');
const User = require('./User');
// const Vote = require('./Vote');
// const Comment = require('./Comment');

// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});


// exports
module.exports = { User, Question };