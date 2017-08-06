import React, {Component} from "react";
import Color from "color";

class Grid extends Component {

    // //length, height string - canvas length and height in px;
    // updateCanvas = (length, height) => {
    //     var canvas = document.getElementById("game-grid");
    //     var context = canvas.getContext("2d");
    //
    //     for (let x = 0.5; x < length; x += 10) {
    //         context.moveTo(x, 0);
    //         context.lineTo(x, height);
    //     }
    //
    //     for (let y = 0.5; y < height; y += 10) {
    //         context.moveTo(0, y);
    //         context.lineTo(length, y);
    //     }
    //
    //     context.strokeStyle = "#ddd";
    //     context.stroke();
    // }

    handleClick = (e) => {
        let canvas = document.getElementById("game-grid");
        let ctx = canvas.getContext("2d");

        let sx = e.nativeEvent.offsetX;
        let sy = e.nativeEvent.offsetY;
        let pxlColor = Color(ctx.getImageData(sx,sy,1,1).data)

        console.log(`sx: ${sx}; sy: ${sy}\ncolor: ${pxlColor}\nimageData: ${ctx.getImageData(sx,sy,1,1).data}`)
        console.log(pxlColor.rgbNumber())
        ctx.fillStyle = "yellow";
        ctx.fillRect(sx-(sx%10), sy-(sy%10), 10, 10);

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
