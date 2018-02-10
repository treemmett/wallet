module.exports = {
  database: {
    url: 'mongodb://localhost:27017',
    name: 'wallet'
  },
  jwt: {
    expiresIn: '1h',
    secret: 'mySecretKey'
  }
}
