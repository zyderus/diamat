import React, { Component } from 'react'

export class Rank extends Component {
  render() {
    const { name, entries } = this.props
    return (
      <div>
        <div className="white f3">
          {`${name}, click to increase`}
        </div>
        <div className="white f1">
          {entries}
        </div>
      </div>
    )
  }
}

export default Rank
