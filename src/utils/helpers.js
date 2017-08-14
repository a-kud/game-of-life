import Color from "color";

/*ctx - canvas context
 sx - offsetX, sy - offetY
returns rgbNumber*/
export function getColor(ctx, sx, sy) {
    return Color(ctx.getImageData(sx,sy,1,1).data).rgbNumber();
}

export function getNeighborsCoordinates(sx, sy) {
    let start = [sx-10, sy-10]
    

}
