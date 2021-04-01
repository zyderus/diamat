const handleSignin = (req, res, knex, bcrypt) => {
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
}

module.exports = {
  handleSignin: handleSignin
}