const { getUsers } = require('../user')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const JWT_SECRET = 'dikiy ponos'

module.exports = function (app) {

  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = 'secret';
  opts.issuer = 'accounts.examplesoft.com';
  opts.audience = 'yoursite.net';
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      // User.findOne({id: jwt_payload.sub}, function(err, user) {
      //     if (err) {
      //         return done(err, false);
      //     }
      //     if (user) {
      //         return done(null, user);
      //     } else {
      //         return done(null, false);
      //         // or you could create a new account
      //     }
      // });
      const users = getUsers()
      user = users.find(u => u.id === jwt_payload.sub)
      done(null, user || false )
  }));

  passport.use(new LocalStrategy({
      usernameField: 'login',
      passwordField: 'password'
    },
    function(login, password, cb) {
      console.log('local strategy in play ', login, password)
      const users = getUsers()
      const user = users.find(u => u.login === login)

      if (user) {
        cb(null, user.password === password ? user : false)
      } else {
        cb(new Error('User not found'))
      }
    }))


  passport.serializeUser(function(user, cb) {
    cb(null, user.login);
  })

  passport.deserializeUser(function(login, cb) {
    const users = getUsers()
    const user = users.find(u => u.login === login)
    cb(null, user)
  })

  app.use(passport.initialize())
};
