const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors')



app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())

app.use(cors())



const port = 8080;

const knex = require('knex');
const config = require('./knexfile').development;
const database = knex(config);

require('dotenv').config();

const axios = require('axios');

app.post("/accounts", (req, res) => {
  console.log(req)
  axios.post('https://sandbox.plaid.com/accounts/balance/get', {
    "client_id": process.env.CLIENT_ID,
    "secret": process.env.SECRET,
    "access_token": req.body.access_token
  })
    .then(function({ data: { accounts }}) {
      console.log({ accounts })
      res.send({ accounts })
    })
      
  })

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
          access_token: null
        }).returning("*")
      }).then(users => {
        const user = users[0]
        res.json({ user })
      }).catch(error => {
      res.json({ error: error.message })
    });
});

app.post('/login', (req, res) => {
  const { user } = req.body;

  database("users")
    .select()
    .where({ username: user.username })
    .first()
    .then(retrievedUser => {
      if (!retrievedUser) throw new Error ('Not a user.')

      return Promise.all([
        bcrypt.compare(user.password, retrievedUser.password),
        Promise.resolve(retrievedUser),
      ])
    }).then(results => {
        const doPasswordsMatch = results[0]
        const user = results[1]

        if (!doPasswordsMatch) throw new Error ('Incorrect password')

        const payload = { username: user.username };
        const secret = process.env.TOKEN_SECRET;

        jwt.sign(payload, secret, (error, token) => {
          if (error) throw new Error ('Unsuccessful Signing')

          return res.json({ token })
          
        })
    }).catch(error => {
      res.json(error.message)
    })
  });

  app.get("/secret-route", authenticate, (req, res) => {
    res.json({ message: `${req.user.username} GOT EM`})
  })

  function authenticate(req, res, next){
    const authHeader = req.get('Authorization');
    const token = authHeader.split(" ")[1];

    const secret = process.env.TOKEN_SECRET;
    jwt.verify(token, secret, (error, payload) => {
      if (error) res.json({ error: error.message });

      database('users')
        .select()
        .where( {username: payload.username })
        .first()
        .then(user => { 
          req.user = user
          next()
        }).catch(error =>
          res.json({ error: error.message }))
    })
  }

  app.get("/getUser/:username", (req, res) => {
    console.log(req, req.params)
    database('users')
      .select()
      .where ({ username: req.params.username})
      .then(users => res.json(users[0]));
  })

  



// const plaid = require('plaid');

app.listen(port, () => console.log(`listening on port ${port}`));