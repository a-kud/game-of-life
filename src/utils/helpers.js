import Color from 'color'

/**
 * @param {object} ctx Canvas context
 * @param {number} sx OffsetX
 * @param {number} sy OffsetY
 * @returns {number} rgbNumber
 */
export function getColor (ctx, sx, sy) {
  return Color(ctx.getImageData(sx, sy, 1, 1).data).rgbNumber()
}

/**
 * @param {number} x X coordinate of game cell.
 * @param {number} y Y coordinate of game cell.
 * @returns {array} Coordinates
 */
export function getNeighborsCoord (x, y) {
  const firstRowY = y - 10 // top left vertex y coordinate for first row cells
  const thirdRowX = y + 10
  // return [
  //   [x - 10, firstRowY],
  //   [x, firstRowY],
  //   [x + 10, firstRowY],
  //   [x - 10, y],
  //   [x + 10, y],
  //   [x - 10, thirdRowX],
  //   [x, thirdRowX],
  //   [x + 10, thirdRowX]
  // ]
  let result = [
    [x - 10, firstRowY],
    [x, firstRowY],
    [x + 10, firstRowY],
    [x - 10, y],
    [x + 10, y],
    [x - 10, thirdRowX],
    [x, thirdRowX],
    [x + 10, thirdRowX]
  ]
  // let adjustedResult = result.map(subarr => subarr.map(
  //   (value) => {
  //     const coordinate = value < 0 && value > -10
  //       ? value + 500
  //       : value
  //     return coordinate
  //   }
  // ))
  const adjustedResult = result.map(subArr =>
    subArr.map((v, i) => {
      if (i === 0) {
        // x coordinate
        if (v < 0) {
          return v + 500
        } else if (v > 500) {
          return v - 500
        } else {
          return v
        }
      } else if (i === 1) {
        // y coordinate
        if (v < 0) {
          return v + 380
        } else if (v > 380) {
          return v - 380
        } else {
          return v
        }
      }
    })
  )
  return adjustedResult
}

/**
 * @returns {array} Top left vertex coordinates for every cell on game grid.
 */
export function getCellCoordinates () {
  const CELL_LENGTH = 10
  const canvas = document.querySelector('#game-grid')
  let coordinates = []

  for (let sx = 1; sx < canvas.width; sx += CELL_LENGTH) {
    for (let sy = 1; sy < canvas.height; sy += CELL_LENGTH) {
      coordinates.push([sx, sy])
    }
  }
  return coordinates
}

/**
 * @returns {array} Coordinates of center of each cell on grid
 */
export function getCenterCoordinates () {
  const CELL_LENGTH = 10
  const canvas = document.querySelector('#game-grid')
  let coordinates = []

  for (let sx = -5; sx < canvas.width + 5; sx += CELL_LENGTH) {
    for (let sy = -5; sy < canvas.height + 5; sy += CELL_LENGTH) {
      coordinates.push([sx, sy])
    }
  }
  return coordinates
}

/**
 * @param {array} coordinates Top left vertex coordinates for every cell on game grid
 * @returns {array} 6% of all cells to be drawn on the grid randomly
 */
export function getCellCoordinatesToDraw (coordinates) {
  let cellToDraw = coordinates.length * 0.06 // 6% cell to be drawn
  let coordinatesToDraw = []

  for (let i = 0; i < cellToDraw; i += 1) {
    coordinatesToDraw.push(
      coordinates[Math.floor(Math.random() * coordinates.length)]
    )
  }

  return coordinatesToDraw
}

/**
 * @param {array} coordinatesToDraw X,Y pairs of top left vertices on grid
 * Function takes single array of arrays and draws squares on game board
 */
export function drawCells (coordinatesToDraw) {
  const canvas = document.querySelector('#game-grid')
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'yellow'
  for (const coordinates of coordinatesToDraw) {
    ctx.fillRect(...coordinates, 9, 9)
  }
}

/**
 * @param {array} coordinatesToClear X,Y pairs of top left vertices on grid
 * Function takes single array of arrays and clears cells on game board
 */
export function clearCells (coordinatesToClear) {
  const canvas = document.querySelector('#game-grid')
  const ctx = canvas.getContext('2d')
  for (const coordinates of coordinatesToClear) {
    ctx.clearRect(...coordinates, 9, 9)
  }
}
