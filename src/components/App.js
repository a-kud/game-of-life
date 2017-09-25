import React, {Component} from "react";
import Controls from "./Controls";
import Grid from "./Grid";
import {
    getColor,
    getNeighborsCoord,
    getCellCoordinates,
    getCenterCoordinates,
    getCellCoordinatesToDraw
        } from "../utils/helpers";
import PropTypes from "prop-types";

class App extends Component {
    state = {
        gridWidth: "501px",
        gridHeight: "381px",
        cellSize: 9
    }

    static propTypes = {
        gridWidth: PropTypes.string,
        gridHeight: PropTypes.string,
        onUpdate: PropTypes.func,
        handleReset: PropTypes.func,
        handleStart: PropTypes.func
    }

    /**
     * Draws cell grid on update
     * @param {number} length Canvas length
     * @param {number} height Canvas height
     */
    handleUpdateCanvas = (length, height) => {
        var canvas = document.getElementById("game-grid");
        var context = canvas.getContext("2d");
        for (let x = 0.5; x < length; x += 10) {
            context.moveTo(x, 0);
            context.lineTo(x, height);
        }

        for (let y = 0.5; y < height; y += 10) {
            context.moveTo(0, y);
            context.lineTo(length, y);
        }

        context.strokeStyle = "#ddd";
        context.stroke();
    }

    handleStart = () => {

        let centerCoordinates = getCenterCoordinates();
        let canvas = document.getElementById("game-grid");
        let ctx = canvas.getContext("2d");

        for (let coordinates of centerCoordinates) {
            let cellColor = getColor(ctx, ...coordinates);

            if ( cellColor === 16776960 ) { // decimal for yellow color
                console.log(`Cell is filled. Coordinates: ${coordinates}`)
                console.log( getNeighborsCoord(...coordinates) )
                // getColor()
            }
        }
    }

    handleReset = () => {
        let canvas = document.getElementById("game-grid");
        let ctx = canvas.getContext("2d");

        let width = parseInt(this.state.gridWidth, 10);
        let height = parseInt(this.state.gridHeight, 10);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.handleUpdateCanvas(width, height);
    }


    render() {
        let width= this.state.gridWidth;
        let height = this.state.gridHeight;

        return(
            <div>
                <Controls handleReset={this.handleReset}
                          handleStart={this.handleStart}/>
                <Grid gridWidth={width}
                      gridHeight={height}
                      onUpdate={this.handleUpdateCanvas}/>
            </div>
        );
    }
}

export default App;
