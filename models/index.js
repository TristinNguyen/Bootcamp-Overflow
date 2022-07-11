const User = require('./User');
const Question = require('./Question');
const Vote = require('./Vote'); 
const Answer = require('./Answer');

// create associations 
// linking the user id to the question - one user can have many questions: hasMany
User.hasMany(Question, {
    foreignKey: 'user_id'
});

// linking the question to the user id - the question can belong to one user, not many: belongsTo
Question.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// linking the user to many questions - viewing their voted on questions 
User.belongsToMany(Question, {
    through: Vote,
    as: 'voted_questions',
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// linking the question to the liked users - viewing how many likes on a question 
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

// vote on the question 
Vote.belongsTo(Question, {
    foreignKey: 'question_id',
    onDelete: 'SET NULL'
});

// users votes
User.hasMany(Vote, {
    foreignKey: 'user_id'
});

// questions votes
Question.hasMany(Vote, {
    foreignKey: 'question_id',
});

// each questioned answer belongs to a particular user (ref user id)
Answer.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// each answer belongs to a particular question (ref question id)
Answer.belongsTo(Question, {
    foreignKey: 'question_id',
    onDelete: 'CASCADE'
});

// a user can add many answers (ref user id)
User.hasMany(Answer, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// a single question can have many answers (ref question id)
Question.hasMany(Answer, {
    foreignKey: 'question_id'
});

module.exports = { User, Question, Vote, Answer};