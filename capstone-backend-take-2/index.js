const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())



const port = 8080;

const knex = require('knex');
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

app.get('/users', (req, res) => {
  database('users')
    .then(users => res.json({ users }))
});

app.post('/user', (req, res) => {
  const { user } = req.body;
  
  bcrypt.hash(user.password, 12)
    .then(hashedPassword => {
      return database("users")
        .insert({ 
          id: user.id,
          username: user.username,
          password: hashedPassword,
          access_token: null,
        }).returning("*")
      }).then(users => {
        const user = users[0]
        res.json({ user })
      }).catch(error => {
      res.json({ error: error.message })
    });
});


// const plaid = require('plaid');

app.listen(port, () => console.log(`listening on port ${port}`));