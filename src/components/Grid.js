import React, {Component} from "react";
import {getColor, getNeighborsCoord, getCellCoordinates} from "../utils/helpers";
import Color from "color";
import PropTypes from "prop-types";

class Grid extends Component {

    static propTypes = {
        onClick: PropTypes.func,
        width: PropTypes.string,
        height: PropTypes.string,
        id: PropTypes.string,
    }

    handleClick = (e) => {
        let canvas = document.getElementById("game-grid");
        let ctx = canvas.getContext("2d");
        let sx = e.nativeEvent.offsetX;
        let sy = e.nativeEvent.offsetY;

        let pxlColor = getColor(ctx, sx, sy);

        console.log(`sx: ${sx}; sy: ${sy}\ncolor: ${pxlColor}\nimageData: ${ctx.getImageData(sx,sy,1,1).data}`)
        console.log(pxlColor)
        ctx.fillStyle = "yellow";
        ctx.fillRect(sx-(sx%10), sy-(sy%10), 10, 10);

         // for teseting purposes:
        // let coordinates = this.getCellCoordinatesToDraw(this.getCellCoordinates());
        // this.drawCells(coordinates);
        // let neighbors = coordinates.map((coordinate) => getNeighborsCoord(coordinate));
        // console.log(coordinates )
    }



    // coordinates - array of top left vertex coordinates for every cell on game grid
    // returns array 6% of all cells to be drawn on the grid randomly
    getCellCoordinatesToDraw = (coordinates) => {
        let cellToDraw = coordinates.length * 0.06 // 6% cell to be drawn
        let coordinatesToDraw = [];

        for (let i = 0; i < cellToDraw; i += 1) {
            coordinatesToDraw.push(coordinates[Math.floor(Math.random()*coordinates.length)]);
        }

        return coordinatesToDraw;
    }

    drawCells = (coordinatesToDraw) => {
        let canvas = document.getElementById("game-grid");
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "yellow";
        for (let coordinates of coordinatesToDraw) {
            ctx.fillRect(...coordinates, 10, 10)
        }
    }

    componentDidMount() {
        let width = parseInt(this.props.gridWidth, 10);
        let height = parseInt(this.props.gridHeight, 10);
        this.props.onUpdate(width, height);
        let coordinates = this.getCellCoordinatesToDraw(getCellCoordinates());
        this.drawCells(coordinates);
    }

    render() {
        return(
            <canvas
                id="game-grid"
                width={this.props.gridWidth}
                height={this.props.gridHeight}
                onClick={this.handleClick}></canvas>
        );
    }
}

export default Grid;
