
exports.up = function(knex) {
  knex('users').del();
  knex('users_2').del();
  return knex.schema.createTable("users_2", (table) => {
    table.increments();
    table.string("name");
    table.string("username");
    table.string("password");
    table.string("access_token");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users_2");
};
