const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Question model
class Question extends Model {
  static vote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      question_id: body.question_id
    })
    .then(() => {
      return Question.findOne({
        where: {
          id: body.question_id
        },
        attributes: [
          'id',
          'title',
          'question_content',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM vote WHERE question.id = vote.question_id & vote.up_vote = true)'), 'upvote_count'
          ],
          [
              sequelize.literal('(SELECT COUNT(*) FROM vote WHERE question.id = vote.question_id & vote.down_vote = true)'), 'downvote_count'
          ]
        ],
        include: [
          {
            model: models.Answer,
            attributes: ['id', 'answer_text', 'question_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      });
    });
  }
}

// create fields/columns for question model
Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    question_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'question'
  }
);

module.exports = Question;
