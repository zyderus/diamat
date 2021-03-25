import React, { Component } from 'react'

export class Navigation extends Component {
  render() {
    return (
      <div>
        <nav style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <p className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
      </div>
    )
  }
}

export default Navigation
