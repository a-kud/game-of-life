import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Controls extends Component {
  static propTypes = {
    onClick: PropTypes.func
  }

  render () {
    return (
      <div className='btns-control'>
        <button onClick={this.props.handleStart}>Start</button>
        <button onClick={this.props.handleManualStart}>Step-by-step</button>
        <button onClick={this.props.handleReset}>Reset</button>
        <span id='generation'>Generation: {this.props.generation}</span>
      </div>
    )
  }
}

export default Controls
