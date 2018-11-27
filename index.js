const bodyParser = require('body-parser')
const restana = require('restana')
const userHandlers = require('./user')
const authHandler = require('./auth')

const service = restana({
  ignoreTrailingSlash: true
})

service.use(bodyParser.json());

// custom middleware to attach the X-Response-Time header to the response
service.use((req, res, next) => {
  const now = new Date().getTime()

  res.on('response', (e) => {
    e.res.setHeader('x-response-time', new Date().getTime() - now)
  })

  return next()
})

service.post('/create', async (req, res) => {
  res.send(await userHandlers.createUser(req))
})

service.post('/auth', authHandler)

service.get('/getbtc', async (req, res) => {
  res.send({
    address: '387ah9XvMLSEVeRFwNyGCDT77evExw2PWG'
  })
})

// start the server
service.start(3000).then((server) => console.log('server started ', server));