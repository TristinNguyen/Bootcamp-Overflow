const { Question } = require('../models');

const questiondata = [
  {
    title: 'Donec posuere metus vitae ipsum.',
    question_content: 'Culpa dicta, tempora accusantium, inventore veniam accusamus libero, laboriosam officia natus molestiae fuga unde voluptatum fugiat saepe aliquam quae explicabo?',
    user_id: 10
  },
  {
  title: 'Gary',
  question_content: 'Who is the best instrustor you have ever had?',
  user_id: 4
  },
  {
    title: 'Lacey',
    question_content: 'who is Garys favorite student?',
    user_id: 2
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    question_content: 'Numquam, inventore in. Quaerat ex aliquam, dolorem voluptatibus architecto dicta dolores minima sequi necessitatibus, ipsum, dolore ab unde eligendi numquam.',
    user_id: 8
  },
  {
    title: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    question_content: 'Illum obcaecati consequuntur doloremque praesentium eos incidunt eligendi voluptatibus? Suscipit a aliquid ipsam maiores. Ad magni atque ipsum repudiandae maiores.',
    user_id: 1
  },
  {
    title: 'Nunc purus.',
    question_content: 'Iusto quod eos voluptas consequatur officiis distinctio, possimus magni illo amet incidunt totam adipisci temporibus dolor repellendus nihil. Laborum, eum?',
    user_id: 4
  },
  {
    title: 'Pellentesque eget nunc.',
    question_content: 'Sint, unde veritatis possimus accusamus cum id omnis magnam quia laborum optio ad nulla modi tenetur, et accusantium laudantium velit!',
    user_id: 7
  },
  {
    title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    question_content: 'Omnis maxime doloremque ab explicabo eveniet nostrum eos adipisci nisi odit inventore excepturi perferendis, sint nesciunt. Ut saepe aperiam id!',
    user_id: 4
  },
  {
    title: 'In hac habitasse platea dictumst.',
    question_content: 'Maiores voluptas eveniet quibusdam mollitia autem at corporis iste molestias vel perferendis nobis fugiat, debitis sit possimus id incidunt ducimus?',
    user_id: 1
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    question_content: 'Accusamus dignissimos reiciendis veniam vel, esse consequuntur quod adipisci enim perspiciatis quaerat ab magni officia aperiam quo id, impedit illum?',
    user_id: 1
  },
  {
    title: 'Duis ac nibh.',
    question_content: 'Nobis ipsa pariatur quaerat aut voluptatum ipsum sit ut officia necessitatibus sunt consectetur, commodi nemo doloremque voluptas fugiat maiores? Cum.',
    user_id: 9
  },
  {
    title: 'Curabitur at ipsum ac tellus semper interdum.',
    question_content: 'Quidem praesentium adipisci dicta voluptatibus quia tempore, veritatis, perferendis aliquam a ducimus saepe error. Non sit voluptatum veniam nihil consectetur.',
    user_id: 5
  },
  {
    title: 'In hac habitasse platea dictumst.',
    question_content: 'Similique quod repudiandae exercitationem officiis maiores non, incidunt, consectetur molestiae a magni, ipsam asperiores? Voluptas accusamus neque reiciendis et dolor.',
    user_id: 3
  },
  {
    title: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    question_content: 'Inventore quibusdam doloremque non, est neque error! Quis, ipsam. Maxime, perferendis! Perferendis aperiam similique explicabo pariatur ea, quasi eligendi reiciendis?',
    user_id: 10
  },
  {
    title: 'Donec dapibus.',
    question_content: 'Incidunt culpa suscipit sed consequatur, ullam repudiandae sit, corporis dolorum nihil alias perferendis, odio nemo quaerat iste ex amet veritatis!',
    user_id: 8
  },
  {
    title: 'Nulla tellus.',
    question_content: 'Illo totam dicta, delectus vitae quia repudiandae quaerat vel, officiis rem voluptatum maiores nihil! Numquam incidunt ut nam facilis nihil?',
    user_id: 3
  },
  {
    title: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
    question_content: 'Sed tempore, nesciunt, consequuntur et harum quas eos quae numquam dolorum veniam ut sit suscipit praesentium architecto saepe id dolorem!',
    user_id: 3
  },
  {
    title:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
    question_content: 'Nesciunt, ratione, sed natus iusto necessitatibus fuga soluta asperiores optio aliquam, aperiam temporibus quis. Sunt laborum delectus veritatis consequatur quaerat.',
    user_id: 7
  },
  {
    title: 'In hac habitasse platea dictumst.',
    question_content: 'Aperiam veniam iure quos impedit beatae ut inventore, odit distinctio eveniet eum possimus, illo molestias dolores, harum necessitatibus nihil rem.',
    user_id: 6
  },
  {
    title: 'Etiam justo.',
    question_content: 'Adipisci earum, laborum quam modi ducimus necessitatibus accusamus, vero soluta minima magni pariatur esse dolorum sit praesentium tempore! Vitae, similique?',
    user_id: 4
  },
  {
    title: 'Nulla ut erat id mauris vulputate elementum.',
    question_content: 'Quaerat commodi officia, at ullam doloremque, expedita reiciendis dolorum earum, ut veritatis aperiam tempore. Odit harum tempore natus dignissimos architecto?',
    user_id: 6
  },
  {
    title: 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    question_content: 'Amet officia doloremque et laboriosam expedita consequuntur nulla, totam quis illum minus saepe cupiditate eos facere ut reprehenderit nemo labore.',
    user_id: 7
  }
];

const seedQuestions = () => Question.bulkCreate(questiondata);

module.exports = seedQuestions;
