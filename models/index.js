const User = require('./User');
const question = require('./question');
const Vote = require('./Vote'); 
const answer = require('./Answer');

// create associations 
// linking the user id to the question - one user can have many questions: hasMany
User.hasMany(question, {
    foreignKey: 'user_id'
});

// linking the question to the user id - the question can belong to one user, not many: belongsTo
question.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// linking the user to many questions - viewing their voted on questions 
User.belongsToMany(question, {
    through: Vote,
    as: 'voted_questions',
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// linking the question to the liked users - viewing how many likes on a question 
question.belongsToMany(User, {
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
Vote.belongsTo(question, {
    foreignKey: 'question_id',
    onDelete: 'SET NULL'
});

// users votes
User.hasMany(Vote, {
    foreignKey: 'user_id'
});

// questions votes
question.hasMany(Vote, {
    foreignKey: 'question_id',
});

// each questioned answer belongs to a particular user (ref user id)
answer.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// each answer belongs to a particular question (ref question id)
answer.belongsTo(question, {
    foreignKey: 'question_id',
    onDelete: 'CASCADE'
});

// a user can add many answers (ref user id)
User.hasMany(answer, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// a single question can have many answers (ref question id)
question.hasMany(answer, {
    foreignKey: 'question_id'
});


module.exports = { User, question, Vote, answer};