import React, { Component } from 'react'

export class ImageLinkForm extends Component {
  render() {
    return (
      <div>
        <p className="f3">
          {'Call to action'}
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
