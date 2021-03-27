import React, { Component } from 'react'
import './ImageLinkForm.css'

export class ImageLinkForm extends Component {
  render() {
    return (
      <div>
        <p className="f3">
          {'This Magic Brain will detect faces in your pictures. Git it a try'}
        </p>
        <div className='w-80 center'>
          <div className='form pa4 br3 shadow-5'>
            <input onChange={this.props.onInputChange} className="f4 pa2 w-70 center" type="text"/>
            <button 
              onClick={this.props.onSubmit} 
              className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            >Detect</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageLinkForm
