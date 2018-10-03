const db = require('../config/db')

const App = db.Model.extend({
    tableName: 'apps'
})

module.exports = App