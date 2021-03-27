// import express from 'express'
const express = require('express')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile('index.html')
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