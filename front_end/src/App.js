import React, { Component } from 'react'
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Particles from 'react-particles-js'

const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 300
      }
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/')
      .then(res => res.json())
      .then(console.log)
  }

  onInputChange = (event) => {
    console.log(event.target.value)
  }

  onSubmit = () => {
    console.log('Submitted')
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }
  
  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions}/>
        <Navigation onRouteChange={ this.onRouteChange } isSignedIn={ this.state.isSignedIn } />
        { this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
              <FaceRecognition />
            </div>
          : this.state.route === 'register'
          ? <Register onRouteChange={ this.onRouteChange }/>
          : <Signin onRouteChange={ this.onRouteChange }/>
        }
      </div>
    );
  }
}

export default App;
