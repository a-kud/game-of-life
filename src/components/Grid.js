import React, {Component} from "react";
import PropTypes from "prop-types";

class Grid extends Component {
    static propTypes = {
        gridWidth: React.PropTypes.string,
        gridHeight: React.PropTypes.string
    }

    //length, height string - canvas length and height in px;
    updateCanvas = (length, height) => {
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

    componentDidMount() {
        let width = parseInt(this.props.gridWidth, 10);
        let height = parseInt(this.props.gridHeight, 10);
        this.updateCanvas(width, height);
    }

    render() {
        return(
            <canvas
                id="game-grid"
                width={this.props.gridWidth}
                height={this.props.gridHeight}></canvas>
        );
    }
}

export default Grid;
