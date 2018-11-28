// TODO: temp in-memory solution
const USERS = []

/**
 * @name createUser
 * req.body = { partnerId, accounttype }
 */
function createUser(req, res) {
  console.log('create user ', req)
  const { partnerId, accounttype } = req.body
  const nextUser = {
    login: 'aaaa' + Math.random(),
    password: 'bbbb',
    partnerId,
    accounttype
  }
  USERS.push(nextUser)
  console.log('all users ', USERS)
  res.send({ login: nextUser.login, password: nextUser.password })
}

function getUsers () {
  return USERS
}

module.exports = {
  createUser,
  getUsers
}