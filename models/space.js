const db = require('../config/db')

const Space = db.Model.extend({
    tableName: 'spaces'
})

module.exports = Space