import Color from "color";

/*ctx - canvas context
 sx - offsetX, sy - offetY
returns rgbNumber*/
export function getColor(ctx, sx, sy) {
    return Color(ctx.getImageData(sx,sy,1,1).data).rgbNumber();
}

/**
 * @param {number} x X coordinate of game cell.
 * @param {number} y Y coordinate of game cell.
 * @returns {array} Coordinates
 */
export function getNeighborsCoord(x, y) {
    let firstRowY = y - 10; // top left vertex y coordinate for first row cells
    let thirdRowX = y + 10;
    return [
            [x - 10, firstRowY],
            [x, firstRowY],
            [x + 10, firstRowY],
            [x - 10, y],
            [x + 10, y],
            [x - 10, thirdRowX],
            [x, thirdRowX],
            [x + 10, thirdRowX]
           ]
}

/**
 * @returns {array} Top left vertex coordinates for every cell on game grid.
 */
export function getCellCoordinates() {

    const CELL_LENGTH = 10;
    let canvas = document.getElementById("game-grid");
    let coordinates = [];

    for(let sx = 1; sx < canvas.width; sx += CELL_LENGTH) {
        for(let sy = 1; sy < canvas.height; sy += CELL_LENGTH) {
            coordinates.push([sx, sy])
        }
    }
    return coordinates;
}

/**
 * @param {array} coordinates Top left vertex coordinates for every cell on game grid
 * @returns {array} 6% of all cells to be drawn on the grid randomly
 */
export function getCellCoordinatesToDraw(coordinates) {
    let cellToDraw = coordinates.length * 0.06 // 6% cell to be drawn
    let coordinatesToDraw = [];

    for (let i = 0; i < cellToDraw; i += 1) {
        coordinatesToDraw.push(coordinates[Math.floor(Math.random()*coordinates.length)]);
    }

    return coordinatesToDraw;
}


/**
 * @param {array} coordinatesToDraw X,Y pairs of top left vertices on grid
 * Function draws squares on game board
 */
export function drawCells(coordinatesToDraw) {
    let canvas = document.getElementById("game-grid");
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "yellow";
    for (let coordinates of coordinatesToDraw) {
        ctx.fillRect(...coordinates, 10, 10)
    }
}
