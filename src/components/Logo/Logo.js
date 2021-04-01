import React, { Component } from 'react'
import Tilt from 'react-tilt'
import './Logo.css'

export class Logo extends Component {
  render() {
    return (
      <div className='ma4 mt0'>
        <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
          <div className="Tilt-inner pa3">
            <img style={{ paddingTop: '25px' }} src="https://img.icons8.com/cotton/64/000000/brain--v2.png" alt='tc'/>
          </div>
        </Tilt>
      </div>
    )
  }
}

export default Logo
