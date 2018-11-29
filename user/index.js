const uuidv4 = require('uuid/v4')
// TODO: temp in-memory solution
// this should not be exported :) all operations throught functions below
const USERS = []

/**
 * @name createUser
 * req.body = { partnerId, accounttype }
 */
function createUser(req, res) {
  console.log('create user ', req)
  const { partnerId, accounttype } = req.body
  const nextUser = {
    id: uuidv4(),
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

function updateUser(data) {

}

module.exports = {
  createUser,
  getUsers,
  updateUser
}