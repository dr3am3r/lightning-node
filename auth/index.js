
module.exports = async (req, res) => {
  const { type } = req.query
  switch (type) {
    case 'auth': return await auth(req, res)
    case 'refresh_token': return await refreshToken(req, res)
    default: res.send({ ok: false })
  }
}

async function auth (req, res) {
  console.log('@@@@ auth ', req)
  res.send({
    "access_token": "sfsdfsdfsdfdsf",
    "token_type": "ffff",
    "refresh_token": "dsfdsfsdfsdfsdfsd",
    "expiry": "0001-01-01T00:00:00Z"
  })
}

async function refreshToken (req, res) {
  res.send({
    "access_token": "sfsdfsdfsdfdsf",
    "token_type": "ffff",
    "refresh_token": "dsfdsfsdfsdfsdfsd",
    "expiry": "0001-01-01T00:00:00Z"
  })
}