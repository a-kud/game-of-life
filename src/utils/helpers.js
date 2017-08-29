import Color from "color";

/*ctx - canvas context
 sx - offsetX, sy - offetY
returns rgbNumber*/
export function getColor(ctx, sx, sy) {
    return Color(ctx.getImageData(sx,sy,1,1).data).rgbNumber();
}

/*x, y - coordinates of game cell, integers*/
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
