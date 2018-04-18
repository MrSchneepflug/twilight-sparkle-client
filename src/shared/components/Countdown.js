import React, {Component} from "react";
import PropTypes from "prop-types";
import {LinearProgress} from "material-ui";

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countdown: props.initialValue
    };

    if (props.active) {
      this.start();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.active && nextProps.active) {
      this.start();
    }
  }

  start() {
    const interval = setInterval(() => {
      if (this.state.countdown > 0) {
        this.setState({
          countdown: this.state.countdown - 1
        });
      } else {
        clearInterval(interval);

        this.setState({
          countdown: this.props.initialValue
        });

        if (typeof this.props.onFinish === "function") {
          this.props.onFinish();
        }
      }
    }, 1000);

  }

  render() {
    if (!this.props.active) {
      return null;
    }

    return (
      <LinearProgress
        variant={"determinate"}
        color={"primary"}
        value={this.state.countdown * 100 / this.props.initialValue}
      />
    )
  }
}

Countdown.propTypes = {
  initialValue: PropTypes.number.isRequired
};

Countdown.defaultProps = {
  initialValue: 3
};

export default Countdown;
