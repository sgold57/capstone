
exports.up = function(knex) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('name');
    table.string('username');
    table.string('password');
    table.string('access_token');
  })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
