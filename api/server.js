// import express from 'express'
const bcrypt = require('bcrypt')
const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// app.use(express.static(__dirname + '/public'))
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'kupola77',
    database : 'smartbrain'
  }
});

// knex.select().from('users').then(data => {
//   console.log(data)
// })

app.get('/test', (req, res) => {
  res.json(req.body)
})

app.get('/', (req, res) => {
  res.json('HOMEPAGE')
})

app.post('/signin', (req, res) => {
  knex.select('email', 'hash').from('login')
  .where('email', '=', req.body.email)
  .then(async data => {
    const isValid = await bcrypt.compare(req.body.password, data[0].hash)
    if (isValid) {
      knex.select().from('users')
        .where('email', '=', req.body.email)
        .then(user => res.json(user[0]))
        .catch(err => res.status(400).json('Unable to get user', err.message))
    } else {
      res.status(400).json('Wrong credentials')
    }
  })
  .catch(err => res.status(400).json('Wrong Credentials'))
})

app.post('/register', async (req, res) => {
  const { email, name, password } = req.body
  const saltRounds = 5
  const hash = await bcrypt.hash(password, saltRounds)
  await knex.transaction(trx => {
    trx.insert ({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      trx('users')
      .returning('*')
      .insert({
        email: loginEmail[0],
        name: name,
        joined: new Date()
      })
      .then(user => res.json(user[0]))
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('Unable to register. ' + err.detail))
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  knex.select().from('users').where({ id }).then(user => {
    user.length ? res.json(user[0]) : res.status(400).json('Error: User doesn\'t exist')
  })
  .catch(err => res.status(400).json('Error: Request errors'))
})

app.put('/image', (req, res) => {
  const { id } = req.body
  knex('users').where('id', '=', id).increment('entries', 1)
  .returning('entries')
  .then(entries => res.json(entries[0]))
  .catch(err => res.status(400).json('ERROR: Entries request errors'))
})

app.listen(3000, () => console.log('Server is on port 3000'))



// const mongoose = require('mongoose');
// const MONGODB_URL = 'Your MongoDB URL';

// mongoose.connect(MONGODB_URL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// });