const express = require('express');
const routes = require('./controllers');
// import connection from sequelize
const sequelize = require('./config/connection');
// make css file available to client
const path = require('path');
// set up handlebars.js
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});



const app = express();
const PORT = process.env.PORT || 3001;

const session = require('express-session');
const { getEventListeners } = require('events');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: 'Super secret code',
  cookie: {},
  resave: false,
  saveUninitalized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
// register hbs engine with the express app
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));


// turn on routes
app.use(routes);



// turn on connection to db and server
// set force: true so tables re-creat/ false to turn off
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
