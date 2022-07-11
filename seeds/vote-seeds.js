const { Vote } = require('../models');

const votedata = [
  {
    user_id: 9,
    question_id: 19
  },
  {
    user_id: 1,
    question_id: 8
  },
  {
    user_id: 8,
    question_id: 12
  },
  {
    user_id: 8,
    question_id: 19
  },
  {
    user_id: 9,
    question_id: 3
  },
  {
    user_id: 3,
    question_id: 16
  },
  {
    user_id: 4,
    question_id: 7
  },
  {
    user_id: 10,
    question_id: 7
  },
  {
    user_id: 3,
    question_id: 18
  },
  {
    user_id: 9,
    question_id: 16
  },
  {
    user_id: 3,
    question_id: 17
  },
  {
    user_id: 10,
    question_id: 2
  },
  {
    user_id: 6,
    question_id: 10
  },
  {
    user_id: 5,
    question_id: 11
  },
  {
    user_id: 6,
    question_id: 1
  },
  {
    user_id: 9,
    question_id: 18
  },
  {
    user_id: 6,
    question_id: 15
  },
  {
    user_id: 6,
    question_id: 7
  },
  {
    user_id: 6,
    question_id: 4
  },
  {
    user_id: 1,
    question_id: 16
  },
  {
    user_id: 10,
    question_id: 18
  },
  {
    user_id: 4,
    question_id: 10
  },
  {
    user_id: 10,
    question_id: 5
  },
  {
    user_id: 5,
    question_id: 16
  },
  {
    user_id: 6,
    question_id: 17
  },
  {
    user_id: 1,
    question_id: 15
  },
  {
    user_id: 7,
    question_id: 13
  },
  {
    user_id: 6,
    question_id: 3
  },
  {
    user_id: 6,
    question_id: 13
  },
  {
    user_id: 7,
    question_id: 1
  },
  {
    user_id: 4,
    question_id: 15
  },
  {
    user_id: 2,
    question_id: 18
  },
  {
    user_id: 9,
    question_id: 10
  },
  {
    user_id: 10,
    question_id: 15
  },
  {
    user_id: 8,
    question_id: 1
  },
  {
    user_id: 10,
    question_id: 8
  },
  {
    user_id: 2,
    question_id: 13
  },
  {
    user_id: 9,
    question_id: 20
  },
  {
    user_id: 1,
    question_id: 17
  },
  {
    user_id: 10,
    question_id: 9
  },
  {
    user_id: 10,
    question_id: 3
  },
  {
    user_id: 5,
    question_id: 6
  },
  {
    user_id: 6,
    question_id: 12
  },
  {
    user_id: 5,
    question_id: 2
  },
  {
    user_id: 6,
    question_id: 14
  },
  {
    user_id: 8,
    question_id: 18
  },
  {
    user_id: 3,
    question_id: 4
  }
];

const seedVotes = () => Vote.bulkCreate(votedata);

module.exports = seedVotes;
