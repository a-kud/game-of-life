import React, {Component} from "react";
import Controls from "./Controls";
import Grid from "./Grid";

class App extends Component {
    render() {
        return(
            <div>
                <Controls />
                <Grid gridWidth="501px" gridHeight="381px"/>
            </div>
        );
    }
}

export default App;
