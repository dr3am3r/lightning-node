const { getUsers } = require('../user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const AUTHORIZED_USERS = []

module.exports = function (app) {

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
