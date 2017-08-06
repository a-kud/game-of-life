import React, {Component} from "react";
import Controls from "./Controls";
import Grid from "./Grid";
import PropTypes from "prop-types";

class App extends Component {
    state = {
        gridWidth: "501px",
        gridHeight: "381px"
    }

    static propTypes = {
        gridWidth: PropTypes.string,
        gridHeight: PropTypes.string
    }

    //length, height string - canvas length and height in px;
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

    render() {
        return(
            <div>
                <Controls />
                <Grid gridWidth={this.state.gridWidth}
                      gridHeight={this.state.gridHeight}
                      onUpdate={this.handleUpdateCanvas(state.gridWidth, state.gridHeight)}/>
            </div>
        );
    }
}

export default App;
