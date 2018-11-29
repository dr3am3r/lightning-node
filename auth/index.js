const jwt = require('jsonwebtoken') 
const randtoken = require('rand-token')
const moment = require('moment')
const { getUsers } = require('../user')

const REFRESH_TOKENS = {}
const TOKEN_EXPIRATION_MINUTES = 300

module.exports = async (req, res) => {
  const { type } = req.query
  switch (type) {
    case 'auth': return await auth(req, res)
    case 'refresh_token': return await refresh(req, res)
    default: res.send({ ok: false })
  }
}

async function auth (req, res) {
  console.log('@@@@ auth ', req.body)
  // for testing purposes only pass is used to check
  const users = getUsers()
  const user = users.find(u => u.password === req.body.password)
  if (true) {
    let token = jwt.sign(user, SECRET, { expiresIn: TOKEN_EXPIRATION_MINUTES }) 
    let refreshToken = randtoken.uid(256)
    REFRESH_TOKENS[refreshToken] = user
    res.send({
      "access_token": token,
      "token_type": "jwt",
      "refresh_token": refreshToken,
      "expiry": moment.minutes(TOKEN_EXPIRATION_MINUTES).utc()//moment().minutes(300).toISOString()
    })
  }
}

async function refresh (req, res) {
  console.log('@@@@ refresh ', req.body)
  const user = REFRESH_TOKENS[req.body.refresh_token]
  // TODO: reuse from above
  if (user) {
    let token = jwt.sign(user, SECRET, { expiresIn: TOKEN_EXPIRATION_MINUTES }) 
    let refreshToken = randtoken.uid(256)
    REFRESH_TOKENS[refreshToken] = user
    res.send({
      "ok": true,
      "access_token": token,
      "token_type": "jwt",
      "refresh_token": refreshToken,
      "expiry": TOKEN_EXPIRATION_MINUTES
    })
  } else {
    res.status(401).send({
      error: true,
      message: 'Huy tebe a ne token'
    })
  }
  // res.send({
  //   "access_token": "sfsdfsdfsdfdsf",
  //   "token_type": "ffff",
  //   "refresh_token": "dsfdsfsdfsdfsdfsd",
  //   "expiry": "0001-01-01T00:00:00Z"
  // })
}