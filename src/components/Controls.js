import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'

class Controls extends Component {
  static propTypes = {
    /**
     * Function to play game in automatic mode
     */
    handleStart: PropTypes.func.isRequired,
    handleManualStart: PropTypes.func,
    handleReset: PropTypes.func,
    /**
     * Current round
     */
    generation: PropTypes.number
  }

  render () {
    return (
      <div className='controls-wrapper'>
        <div className='controls'>
          <Button variant='raised' onClick={this.props.handleStart}>
            Start
          </Button>
          <Button variant='raised' onClick={this.props.handleManualStart}>
            Step-by-step
          </Button>
          <Button variant='raised' onClick={this.props.handleReset}>
            Reset
          </Button>
        </div>
        <span id='generation-count'>Generation: {this.props.generation}</span>
      </div>
    )
  }
}

export default Controls
