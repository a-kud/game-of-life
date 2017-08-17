import Color from "color";

/*ctx - canvas context
 sx - offsetX, sy - offetY
returns rgbNumber*/
export function getColor(ctx, sx, sy) {
    return Color(ctx.getImageData(sx,sy,1,1).data).rgbNumber();
}

/*sx, sy - coordinates of mouse click*/
export function getNeighborsCoordinates(sx, sy) {

    const DIAGONAL = 10*Math.sqrt(2); //cell diagonal length
    let xTopLeft = sx-(sx%10); // 10 - cell length
    let yTopLeft = sy-(sy%10);

    /*x, y - coordinates of top left vertex of cell*/
    function getDiagCoord(x, y) {
        // starting to calculate vertices coordinates:
        let firstNeighborX = x - 10;
        let firstNeighborY = y + 10;

        return [
                [firstNeighborX, firstNeighborY],
                [firstNeighborX + 10, firstNeighborY],
                [firstNeighborX + 20, firstNeighborY],    
               ]
    }


}
