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

    render() {
        return(
            <div>
                <Controls />
                <Grid gridWidth={this.state.gridWidth} gridHeight={this.state.gridHeight}/>
            </div>
        );
    }
}

export default App;
