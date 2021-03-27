// import express from 'express'
const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// app.use(express.static(__dirname + '/public'))

const database = {
  users: [
    {
      id: '123',
      name: 'Tom',
      email: 'rus@mail.com',
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
  ]
}

// app.get('/test', (req, res) => {
//   res.sendFile('index.html')
// })

app.get('/', (req, res) => {
  res.json(database.users)
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email 
    && req.body.password === database.users[0].password) {
      res.json('success')
    } else {
      res.status(400).json({name: 'Que', job: 'Fisker'})
    }
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body
  database.users.push({
    id: '135',
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    entries: 0,
    joined: new Date()
  })
  res.json(database)
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