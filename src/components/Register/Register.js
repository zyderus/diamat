import React, { Component } from 'react'
import { localhost } from '../../config'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  onEmailChange = e => {
    this.setState({ email: e.target.value })
    console.log(this.state.email)
  }

  onPasswordChange = e => {
    this.setState({ password: e.target.value })
    console.log(this.state.password)
  }

  onNameChange = e => {
    this.setState({ name: e.target.value })
    console.log(this.state.name)
  }

  onSubmitSignin = () => {
    fetch(`${localhost}/register`, {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(res => res.json())
    // .then(console.log)
    .then(user => {
      if (user.id) {
        this.props.loadUser(user)
        this.props.onRouteChange('home')
      }
    })
  }

  render() {
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-30-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="text" 
                  name="name"  
                  id="name"
                  onChange={ this.onNameChange }
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address"
                  onChange={ this.onEmailChange }
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password"
                  onChange={ this.onPasswordChange }
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={ this.onSubmitSignin }
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign up"/>
            </div>
          </div>
        </main>
      </article>
    )
  } 
}

export default Register
