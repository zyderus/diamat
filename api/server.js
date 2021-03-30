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

knex.select().from('users').then(data => {
  console.log(data)
})

const database = {
  users: [
    {
      id: '123',
      name: 'Tom',
      email: 'asdf',
      password: 'asdf1234',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Liz',
      email: 'liz@mail.com',
      password: 'asdf1234',
      entries: 0,
      joined: new Date()
    },
    {
      id: '2 2',
      name: 'Li z',
      email: 'liz@@mail.com',
      password: 'asdf12344',
      entries: 'a',
      joined: 'date'
    }
  ]
}

app.get('/test', (req, res) => {
  res.json(req.body)
})

app.get('/', (req, res) => {
  res.json(database.users)
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email 
    && req.body.password === database.users[0].password) {
      res.json('success')
    } else {
      res.status(400).json('Your credentials are incorrect')
    }
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body
  const saltRounds = 5
  bcrypt.hash(password, saltRounds).then(function(hash) {
    // Store hash in your password DB.
    console.log(hash)
  }); 

  knex('users')
  .returning('*')
  .insert({
    email: email,
    name: name,
    joined: new Date()
  })
  .then(user => {
    res.json(user[0])
  })
  .catch(err => res.status(400).json('Unable to register. ' + err.detail))
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  let found = false
  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      return res.json(user)
    }
  })
  if (!found) res.status(400).json('user not found')
})

app.put('/image', (req, res) => {
  const { id } = req.body
  let found = false
  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      user.entries++
      return res.json(user.entries)
    }
  })
  if (!found) res.status(400).json('user not found')
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