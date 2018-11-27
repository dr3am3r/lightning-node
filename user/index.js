const USERS = []

module.exports = {
  createUser
}

async function createUser(params) {
  console.log('create user ', params)
    const nextUser = {
      login: 'aaaa' + Math.random(),
      password: 'bbbb'
    }
    USERS.push(nextUser)
    return nextUser
}