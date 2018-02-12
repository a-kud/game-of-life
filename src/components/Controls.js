import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'

class Controls extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='btns-control'>
        <Button variant='raised' onClick={this.props.handleStart}>
          Start
        </Button>
        <Button variant='raised' onClick={this.props.handleManualStart}>
          Step-by-step
        </Button>
        <Button variant='raised' onClick={this.props.handleReset}>
          Reset
        </Button>
        <span id='generation'>Generation: {this.props.generation}</span>
      </div>
    )
  }
}

export default Controls
