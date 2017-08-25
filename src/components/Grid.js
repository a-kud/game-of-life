import React, {Component} from "react";
import {getColor} from "../utils/helpers";
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

        this.getCellQuantity();
    }

    //return array with top left vertex coordinates for every cell on game grid
    getCellCoordinates = () => {
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

    //returns total cell quantity on the grid
    getCellQuantity = () => {
        const CELL_LENGTH = 10;
        let canvas = document.getElementById("game-grid");
        return Math.round(canvas.width/CELL_LENGTH)
                * Math.round(canvas.height/CELL_LENGTH);
    }

    // coordinates - array of top left vertex coordinates for every cell on game grid
    // returns 20% cells to be drawn on the grid randomly
    getCellCoordinatesToDraw = (coordinates) => {
        let cells = getCellQuantity(coordinates);
        let cellToDraw = cells * 0.2 // 20% cell to be drawn
        let coordinatesToDraw = [];

        for (let i = 0; i < cellToDraw; i += 1) {
            coordinatesToDraw.push(coordinates[Math.floor(Math.random()*coordinates.length)]);
        }

        cosnole.log(coordinatesToDraw)
    }

    componentDidMount() {
        let width = parseInt(this.props.gridWidth, 10);
        let height = parseInt(this.props.gridHeight, 10);
        this.props.onUpdate(width, height);
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
