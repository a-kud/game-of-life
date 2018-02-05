import React, { Component } from 'react'
import {
  getCellCoordinates,
  getCellCoordinatesToDraw,
  drawCells,
  getColor
} from '../utils/helpers'
import PropTypes from 'prop-types'

class Grid extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
    id: PropTypes.string
  }

  handleClick = e => {
    const sx = e.nativeEvent.offsetX
    const sy = e.nativeEvent.offsetY
    const toggleColor = (x, y) => {
      const canvas = document.getElementById('game-grid')
      const ctx = canvas.getContext('2d')

      ctx.fillStyle = 'yellow'
      if (getColor(ctx, x, y)) {
        ctx.clearRect(x, y, 9, 9)
      } else {
        ctx.fillRect(x, y, 9, 9)
      }
    }
    toggleColor(sx - sx % 10 + 1, sy - sy % 10 + 1)
  }

  componentDidMount () {
    let width = parseInt(this.props.gridWidth, 10)
    let height = parseInt(this.props.gridHeight, 10)
    this.props.onUpdate(width, height)
    let coordinates = getCellCoordinatesToDraw(getCellCoordinates())
    drawCells(coordinates)
  }

  render () {
    return (
      <canvas
        id='game-grid'
        width={this.props.gridWidth}
        height={this.props.gridHeight}
        onClick={this.handleClick}
      />
    )
  }
}

export default Grid
