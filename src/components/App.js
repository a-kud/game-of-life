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

class App extends Component {
  state = {
    /**
     * Game grid length
     */
    gridWidth: '501px',
    /**
     * Game grid height
     */
    gridHeight: '381px',
    cellSize: 9,
    generation: 1,
    resetRequired: false
  }

  /**
   * Draws cell grid
   * @param {number} length Canvas length
   * @param {number} height Canvas height
   */
  drawGrid = (length, height) => {
    const canvas = document.querySelector('#game-grid')
    const context = canvas.getContext('2d')
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

  playRound = () => {
    const centerCoordinates = getCenterCoordinates()
    const canvas = document.getElementById('game-grid')
    const ctx = canvas.getContext('2d')
    const makeTopLeftCoord = (coordinate, i) => {
      if (i === 0) {
        return coordinate > 0 ? coordinate - 4 : coordinate + 496
      } else if (i === 1) {
        return coordinate > 0 ? coordinate - 4 : coordinate + 376
      }
    }

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
      if (
        ([0, 1].includes(liveNeigborsCount) || liveNeigborsCount >= 4) &&
        cellColor
      ) {
        // only live cell can die
        cellsToDie.push(coordinates.map(makeTopLeftCoord))
      }
      if (liveNeigborsCount === 3 && !cellColor) {
        cellsToBeBorn.push(coordinates.map(makeTopLeftCoord))
      }
    }
    clearCells(cellsToDie)
    drawCells(cellsToBeBorn)
    this.setState(prevState => ({ generation: prevState.generation + 1 }))
  }

  handleStart = () => {
    const runForever = () => {
      if (this.state.resetRequired) {
        this.setState(prevState => ({
          resetRequired: !prevState.resetRequired
        }))
        return // stop if reset button's pressed
      }

      // this.setState(prevState => ({ generation: prevState.generation + 1 }))
      this.playRound()
      setTimeout(runForever, 1000)
    }

    runForever()
  }

  handleReset = () => {
    const canvas = document.getElementById('game-grid')
    const ctx = canvas.getContext('2d')

    const width = parseInt(this.state.gridWidth, 10)
    const height = parseInt(this.state.gridHeight, 10)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.drawGrid(width, height)
    this.setState(prevState => ({
      resetRequired: !prevState.resetRequired,
      generation: 1
    }))
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
          handleManualStart={this.playRound}
          generation={this.state.generation}
        />
        <Grid gridWidth={width} gridHeight={height} onUpdate={this.drawGrid} />
      </div>
    )
  }
}

export default App
