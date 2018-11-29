const bodyParser = require('body-parser')
const restana = require('restana')
const passport = require('passport')
const userHandlers = require('./user')
const authHandler = require('./auth')
const setupAuth = require('./auth/init')
//const { errorMiddleware } = require('./log/error-middleware')

const service = restana({
  ignoreTrailingSlash: true
})

// X-response time
service.use((req, res, next) => {
  const now = new Date().getTime()

  res.on('response', (e) => {
    e.res.setHeader('x-response-time', new Date().getTime() - now)
  })

  return next()
})

// json bodyparser
service.use(bodyParser.json())
service.use(bodyParser.urlencoded({ extended: true }))

// auth middleware setup
setupAuth(service)

service.post('/create', userHandlers.createUser)
service.post('/auth', authHandler)

service.get('/getbtc', passport.authenticate('jwt'), async (req, res) => {
  res.send({
    ok: true,
    address: '387ah9XvMLSEVeRFwNyGCDT77evExw2PWG'
  })
})

// TODO: the last but not least
//service.use(errorMiddleware)

// start the server
service
  .start(3000)
  .then((server) => console.log('server started '));