const db = require('../config/db')
const App = require('./app')

const Space = db.Model.extend({
    tableName: 'spaces',
    apps: function () {
        return this.hasMany(App);
    }
})

module.exports = Space