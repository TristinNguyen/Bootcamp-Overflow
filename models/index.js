const User = require('./User');
const Question = require('./Question');
const Vote = require('./Vote'); 
const Answer = require('./Answer');

// create associations 
User.hasMany(Question, {
    foreignKey: 'user_id'
});

Question.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

User.belongsToMany(Question, {
    through: Vote,
    as: 'voted_questions',
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Question.belongsToMany(User, {
    through: Vote,
    as: 'voted_questions',
    foreignKey: 'question_id',
    onDelete: 'CASCADE'
});

// votes of the user 
Vote.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// vote on the Question 
Vote.belongsTo(Question, {
    foreignKey: 'question_id',
    onDelete: 'SET NULL'
});

// users votes
User.hasMany(Vote, {
    foreignKey: 'user_id'
});

// Questions votes
Question.hasMany(Vote, {
    foreignKey: 'question_id',
});

Answer.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Answer.belongsTo(Question, {
    foreignKey: 'question_id',
    onDelete: 'CASCADE'
});

User.hasMany(Answer, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Question.hasMany(Answer, {
    foreignKey: 'question_id'
});

module.exports = { User, Question, Vote, Answer};