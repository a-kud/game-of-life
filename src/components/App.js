import React, { Component } from 'react'
import Controls from './Controls'
import Grid from './Grid'
import {
  getColor,
  getNeighborsCoord,
  getCenterCoordinates,
  drawCells,
  clearCells
} from '../utils/helpers'
import PropTypes from 'prop-types'

class App extends Component {
  state = {
    gridWidth: '501px',
    gridHeight: '381px',
    cellSize: 9
  }

  static propTypes = {
    /**
     * Game grid length
     */
    gridWidth: PropTypes.string,
    /**
     * Game grid height
     */
    gridHeight: PropTypes.string,
    /**
     * Gets called when game grid updates: at initial run and Reset
     */
    onUpdate: PropTypes.func,
    /**
     * Gets called when user resets game state
     */
    handleReset: PropTypes.func,
    /**
     * Gets called when user clicks game start buttons
     */
    handleStart: PropTypes.func
  }

  /**
   * Draws cell grid on update
   * @param {number} length Canvas length
   * @param {number} height Canvas height
   */
  handleUpdateCanvas = (length, height) => {
    var canvas = document.getElementById('game-grid')
    var context = canvas.getContext('2d')
    for (let x = 0.5; x < length; x += 10) {
      context.moveTo(x, 0)
      context.lineTo(x, height)
    }

    for (let y = 0.5; y < height; y += 10) {
      context.moveTo(0, y)
      context.lineTo(length, y)
    }

    context.strokeStyle = '#ddd'
    context.stroke()
  }

  handleStart = () => {
    const centerCoordinates = getCenterCoordinates()
    const canvas = document.getElementById('game-grid')
    const ctx = canvas.getContext('2d')

    const makeTopLeftCoord = coordinate => coordinate - 4

    let cellsToDie = []
    let cellsToBeBorn = []

    for (const coordinates of centerCoordinates) {
      const cellColor = getColor(ctx, ...coordinates)
      const neighbors = getNeighborsCoord(...coordinates)

      let liveNeigborsCount = 0

      for (const neighbor of neighbors) {
        liveNeigborsCount =
          getColor(ctx, ...neighbor) !== 0
            ? liveNeigborsCount + 1
            : liveNeigborsCount
      }
      if ([0, 1, 4].includes(liveNeigborsCount) && cellColor) {
        // only live cell can die
        cellsToDie.push(coordinates.map(makeTopLeftCoord))
      }
      if (liveNeigborsCount === 3) {
        cellsToBeBorn.push(coordinates.map(makeTopLeftCoord))
      }
    }
    console.log(`cellsToBeBorn: ${cellsToBeBorn}\ncellsToDie: ${cellsToDie}`)
    clearCells(cellsToDie)
    drawCells(cellsToBeBorn)
  }

  handleReset = () => {
    let canvas = document.getElementById('game-grid')
    let ctx = canvas.getContext('2d')

    let width = parseInt(this.state.gridWidth, 10)
    let height = parseInt(this.state.gridHeight, 10)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.handleUpdateCanvas(width, height)
  }

  render () {
    let width = this.state.gridWidth
    let height = this.state.gridHeight

    return (
      <div>
        <h1 id='game-title'>Conway's Game of Life</h1>
        <Controls
          handleReset={this.handleReset}
          handleStart={this.handleStart}
        />
        <Grid
          gridWidth={width}
          gridHeight={height}
          onUpdate={this.handleUpdateCanvas}
        />
      </div>
    )
  }
}

export default App
