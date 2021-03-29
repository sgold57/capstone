
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "Sam1", password: "Sam1", access_token: "access-sandbox-d59d9e0d-03de-4cd6-831b-5ab4797f2f90"},
        {username: "Jill1", password: "Jill1", access_token: "access-sandbox-56f7c476-a56c-4390-b04f-528e8153f56f"},
        {username: "Noah1", password: "Noah1", access_token: "access-sandbox-49cb24cc-bfa9-4a08-8593-2602ef135814"}
      ]);
    });
};
