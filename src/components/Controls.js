import React, {Component} from "react";
import PropTypes from "prop-types";

class Controls extends Component {

    static propTypes = {
        handleReset: PropTypes.func
    }

    render() {
        return(
            <div className="btns-control">
                <button>Start</button>
                <button>Pause</button>
                <button onClick={this.props.handleReset}>Reset</button>
            </div>
        );
    }
}

export default Controls;
