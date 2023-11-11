// Подключение необходимых модулей
const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
// const userController = require('./controllers/userController');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/webcabar',
    collection: 'mySessions'
});

// Catch errors
store.on('error', function(error) {
    console.log(error);
  });
  
app.use(session({
    secret: 'secret_webcabar_secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      },
      store: store,
      // Boilerplate options, see:
      // * https://www.npmjs.com/package/express-session#resave
      // * https://www.npmjs.com/package/express-session#saveuninitialized
      resave: true,
      saveUninitialized: true
  }));

require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID: '339918182318-mnao9hirveih24d8r4vfo5tp8abl66tf.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    scope: ['profile', 'email']
  },
  async function(accessToken, refreshToken, profile, done) {
    // здесь вы можете сохранить информацию профиля в базе данных
    console.log(profile)

    // await userController.createUser({email: login: profile.name.givenName, password: profile.id, googleid: profile.id});

    return done(null, profile);
  }
));

require('./db');

app.use(express.json());
app.use(require('./routes/userRoutes'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


// Установка пути к папке с шаблонами
app.set('views', path.join(__dirname, '/views'));

// Определение маршрута
app.get('/', (req, res) => {
    let userLoggedIn = !!req.session.login;
    res.render('index', { title: 'Главная страница', userLoggedIn: userLoggedIn });
});

app.get('/map', (req, res) => {
    let userLoggedIn = !!req.session.login;
    res.render('map', { title: 'map', userLoggedIn: userLoggedIn });
});

app.post('/logout', function(req, res) {
    req.session.destroy(function(err) {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Could not log out, please try again' }); 
      } else {
        res.redirect('/');
      }
    });
  });

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function(req, res) {
    // Успешная аутентификация, перенаправляем домой.
    res.redirect('/');
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});