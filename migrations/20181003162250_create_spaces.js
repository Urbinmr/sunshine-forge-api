// in migration file
exports.up = function (knex, Promise) {
    return knex.schema.createTable('spaces', function (table) {
        table.increments() // set up Primary Key ID field
        table.string('name')
        table.integer('memory_quotamb')
        table.integer('disk_quotamb')
    })
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('spaces')
}