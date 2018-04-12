import React, {Component} from "react";

const INITIAL_VALUE_DEFAULT = 3;

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countdown: props.initialValue || INITIAL_VALUE_DEFAULT
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
          countdown: this.props.initialValue || INITIAL_VALUE_DEFAULT
        });

        this.props.onFinish();
      }
    }, 1000);

  }

  render() {
    return (
      <div>
        {this.state.countdown}
      </div>
    )
  }
}

export default Countdown;
