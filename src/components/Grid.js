import React, {Component} from "react";

class Grid extends Component {
    static propTypes = {
        gridWidth: React.PropTypes.string,
        gridHeight: React.PropTypes.string
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
