const passport = require('passport')
,LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const hostname = '127.0.0.1';
const port = 3000;
const bodyParser = require('body-parser');

const app = express();
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

const Router = express.Router();
app.use(bodyParser.json())
app.use('/', Router);
app.use(passport.initialize());
app.use(passport.session());
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

passport.use(new LocalStrategy((username, password, done) => {
  if(username === 'gokul' && password == 'gokul') {
    return done(null, {name: 'gokul', age: 33})
  } else if (username === 'gokul' && password ==! 'gokul') {
    return done(null, false, { message: 'incorrect pwd'})
  } else {
    return done(null, false, { message: 'invalid username or pwd'})
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/welcome', (req, res) => {
  res.send({message: "Hello World!!!"})
})

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send({message: "success"})
})