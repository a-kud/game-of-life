import React, {Component} from "react";
import Grid, {updateCanvas} from "./Grid";

class Controls extends Component {

    handleReset = () => {
        let canvas = document.getElementById("game-grid");
        let ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateCanvas();
    }

    render() {
        return(
            <div className="btns-control">
                <button>Start</button>
                <button>Pause</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        );
    }
}

export default Controls;
