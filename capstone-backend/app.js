const express = require("express");
const app = express();
const port = 8080;

const knex = require("knex");
const config = require('./knexfile').development;
const database = knex(config);

app.get("/users", (_, response) => {
  database('users')
    .then(users => response.json({ users }));
})



app.listen(port, () => console.log(`listening on port ${port}`));