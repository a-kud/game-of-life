import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Controls extends Component {
  static propTypes = {
    handleReset: PropTypes.func,
    handleStart: PropTypes.func
  }

  render () {
    return (
      <div className='btns-control'>
        <button onClick={this.props.handleStart}>Start</button>
        <button>Step-by-step</button>
        <button onClick={this.props.handleReset}>Reset</button>
        <span id='generation'>Generation: {this.props.generation}</span>
      </div>
    )
  }
}

export default Controls
