const express = require("express");
const app = express();
const port = 8080;

const knex = require("knex");
const config = require('./knexfile').development;
const database = knex(config);

require('dotenv').config();


const axios = require('axios');
app.get("/api", (req, res) => {
  axios.post('https://sandbox.plaid.com/sandbox/public_token/create', {
    "client_id": process.env.CLIENT_ID,
    "secret": process.env.SECRET,
    "institution_id": "ins_3",
    "initial_products": ["auth"],
    "options": {
      "webhook": "https://www.genericwebhookurl.com/webhook"
    }
  })
    .then(function({ data: { public_token } }) {
      // handle success

      axios.post('https://sandbox.plaid.com/item/public_token/exchange', {
        "client_id": process.env.CLIENT_ID,
        "secret": process.env.SECRET,
        "public_token": public_token
      })
        .then(({ data: { access_token }}) => res.send({ access_token }))
        .catch(error => res.send({ error }))

    })
    .catch(function (error) {
      // handle error
      res.send({ error: error });
    })
    .then(function () {
      // always executed
    });
})

const plaid = require('plaid');

// const plaid = require('plaid')
// const plaidClient = new plaid.Client({
//   "clientId": "60591e81bf6a120012cee04e", 
//   "secret": "4f677ef9b9c13da8d7275c75b5ed00",
//   "env": plaid.environments.sandbox
// });


app.get("/users", (_, response) => {
  database('users')
    .then(users => response.json({ users }));
})



app.listen(port, () => console.log(`listening on port ${port}`));