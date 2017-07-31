import React, {Component} from "react";
import PropTypes from "prop-types";

class Grid extends Component {
    static propTypes = {
        gridWidth: React.PropTypes.string,
        gridHeight: React.PropTypes.string
    }

    updateCanvas = () => {
        var canvas = document.getElementById("game-grid");
        var context = canvas.getContext("2d");

        for (var x = 0.5; x < 501; x += 10) {
            context.moveTo(x, 0);
            context.lineTo(x, 381);
        }

        for (var y = 0.5; y < 381; y += 10) {
            context.moveTo(0, y);
            context.lineTo(500, y);
        }

        context.strokeStyle = "#ddd";
        context.stroke();
    }

    componentDidMount() {
        this.updateCanvas();
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
