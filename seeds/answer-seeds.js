const { Answer } = require('../models');

const answerdata = [
  {
    answer_text: 'Nunc rhoncus dui vel sem.',
    user_id: 6,
    question_id: 1
  },
  {
    answer_text: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    user_id: 6,
    question_id: 8
  },
  {
    answer_text: 'Aliquam erat volutpat. In congue.',
    user_id: 3,
    question_id: 10
  },
  {
    answer_text: 'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    user_id: 3,
    question_id: 18
  },
  {
    answer_text: 'In hac habitasse platea dictumst.',
    user_id: 7,
    question_id: 5
  },
  {
    answer_text: 'Vivamus vestibulum sagittis sapien.',
    user_id: 1,
    question_id: 20
  },
  {
    answer_text: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    user_id: 6,
    question_id: 7
  },
  {
    answer_text: 'Sed vel enim sit amet nunc viverra dapibus.',
    user_id: 7,
    question_id: 4
  },
  {
    answer_text: 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.',
    user_id: 6,
    question_id: 12
  },
  {
    answer_text: 'Morbi a ipsum.',
    user_id: 6,
    question_id: 20
  },
  {
    answer_text: 'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    user_id: 3,
    question_id: 14
  },
  {
    answer_text: 'Donec ut mauris eget massa tempor convallis.',
    user_id: 5,
    question_id: 4
  },
  {
    answer_text:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    user_id: 4,
    question_id: 9
  },
  {
    answer_text:
      'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    user_id: 5,
    question_id: 14
  },
  {
    answer_text: 'Quisque porta volutpat erat.',
    user_id: 6,
    question_id: 2
  },
  {
    answer_text: 'Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    user_id: 8,
    question_id: 2
  },
  {
    answer_text:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.',
    user_id: 2,
    question_id: 20
  },
  {
    answer_text: 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.',
    user_id: 4,
    question_id: 11
  },
  {
    answer_text:
      'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.',
    user_id: 5,
    question_id: 13
  },
  {
    answer_text:
      'Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    user_id: 9,
    question_id: 16
  },
  {
    answer_text: 'Curabitur convallis.',
    user_id: 6,
    question_id: 4
  },
  {
    answer_text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    user_id: 4,
    question_id: 10
  },
  {
    answer_text: 'Morbi non quam nec dui luctus rutrum.',
    user_id: 3,
    question_id: 8
  },
  {
    answer_text:
      'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.',
    user_id: 8,
    question_id: 10
  },
  {
    answer_text:
      'Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    user_id: 1,
    question_id: 15
  },
  {
    answer_text: 'Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend.',
    user_id: 5,
    question_id: 3
  },
  {
    answer_text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    user_id: 1,
    question_id: 15
  },
  {
    answer_text: 'Nam tristique tortor eu pede.',
    user_id: 4,
    question_id: 16
  },
  {
    answer_text: 'Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    user_id: 4,
    question_id: 18
  },
  {
    answer_text: 'Proin eu mi. Nulla ac enim.',
    user_id: 4,
    question_id: 10
  },
  {
    answer_text: 'Sed ante. Vivamus tortor.',
    user_id: 7,
    question_id: 5
  },
  {
    answer_text: 'Aliquam quis turpis eget elit sodales scelerisque.',
    user_id: 10,
    question_id: 1
  },
  {
    answer_text: 'Donec quis orci eget orci vehicula condimentum.',
    user_id: 3,
    question_id: 19
  },
  {
    answer_text: 'Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    user_id: 5,
    question_id: 3
  },
  {
    answer_text: 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.',
    user_id: 10,
    question_id: 14
  },
  {
    answer_text: 'Maecenas ut massa quis augue luctus tincidunt.',
    user_id: 10,
    question_id: 8
  },
  {
    answer_text: 'Cras in purus eu magna vulputate luctus.',
    user_id: 10,
    question_id: 11
  },
  {
    answer_text: 'Etiam vel augue. Vestibulum rutrum rutrum neque.',
    user_id: 8,
    question_id: 5
  },
  {
    answer_text: 'Proin at turpis a pede posuere nonummy.',
    user_id: 8,
    question_id: 19
  },
  {
    answer_text: 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.',
    user_id: 9,
    question_id: 19
  },
  {
    answer_text:
      'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    user_id: 5,
    question_id: 4
  },
  {
    answer_text:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.',
    user_id: 2,
    question_id: 11
  },
  {
    answer_text: 'Vestibulum ac est lacinia nisi venenatis tristique.',
    user_id: 4,
    question_id: 6
  },
  {
    answer_text: 'Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    user_id: 9,
    question_id: 6
  },
  {
    answer_text:
      'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.',
    user_id: 7,
    question_id: 9
  },
  {
    answer_text: 'Integer ac leo. Pellentesque ultrices mattis odio.',
    user_id: 4,
    question_id: 19
  },
  {
    answer_text: 'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    user_id: 10,
    question_id: 1
  },
  {
    answer_text:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.',
    user_id: 2,
    question_id: 19
  },
  {
    answer_text: 'Proin risus. Praesent lectus.',
    user_id: 10,
    question_id: 1
  },
  {
    answer_text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus.',
    user_id: 10,
    question_id: 12
  }
];

const seedAnswers = () => Answer.bulkCreate(answerdata);

module.exports = seedAnswers;
