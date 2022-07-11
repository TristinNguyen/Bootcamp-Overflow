const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'Joe Doaks',
    email: 'jdoaks@gmail.com',
    password: 'jd123'
  },
  {
    username: 'Barry Sanders',
    email: 'bsanders@lions.com',
    password: 'bs123'
  },
  {
    username: 'FunnyGuy',
    email: 'FunnyGuy@jokes.com',
    password: 'fg123'
  },
  {
    username: 'Humpty Dumpty',
    email: 'HD@gmail.com',
    password: 'hd123'
  },
  {
    username: 'Eric Cartman',
    email: 'ec@gmail.com',
    password: 'ec123'
  },
  {
    username: 'Ronald',
    email: 'ronnym@gmail.com',
    password: 'password123'
  },
  {
    username: 'alesmonde0',
    email: 'nwestnedge0@cbc.ca',
    password: 'password123'
  },
  {
    username: 'jwilloughway1',
    email: 'rmebes1@sogou.com',
    password: 'password123'
  },
  {
    username: 'iboddam2',
    email: 'cstoneman2@last.fm',
    password: 'password123'
  },
  {
    username: 'dstanmer3',
    email: 'ihellier3@goo.ne.jp',
    password: 'password123'
  },
  {
    username: 'djiri4',
    email: 'gmidgley4@weather.com',
    password: 'password123'
  },
  {
    username: 'msprague5',
    email: 'larnout5@imdb.com',
    password: 'password123'
  },
  {
    username: 'mpergens6',
    email: 'hnapleton6@feedburner.com',
    password: 'password123'
  },
  {
    username: 'tpenniell7',
    email: 'kperigo7@china.com.cn',
    password: 'password123'
  },
  {
    username: 'msabbins8',
    email: 'lmongain8@google.ru',
    password: 'password123'
  },
  {
    username: 'jmacarthur9',
    email: 'bsteen9@epa.gov',
    password: 'password123'
  },
  {
    username: 'Rich',
    email: 'rs@gmail.com',
    password: 'rs123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
