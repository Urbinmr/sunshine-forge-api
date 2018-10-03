const knexFile = require('../knexfile')
const knex = require('knex')(knexFile[process.env.NODE_ENV || 'development'])

const bookshelf = require('bookshelf')(knex)
module.exports = bookshelf