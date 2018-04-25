import React, {Component} from "react";
import {connect} from "react-redux";
import {LinearProgress} from "material-ui";
import {Client} from "../../../shared/components";
import ClientCollection from "../../../shared/ClientCollection";
import push from "../../../shared/actions/history/push";
import resetEstimations from "../../actions/resetEstimations";
import createCountdown from "../../../shared/countdown";

const INITIAL_GLOBAL_COUNTDOWN = 3;
const INITIAL_LOWEST_COUNTDOWN = 3;
const INITIAL_HIGHEST_COUNTDOWN = 3;

class Arena extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientWithLowestEstimationActive: false,
      clientWithHighestEstimationActive: false,
      globalCountdown: INITIAL_GLOBAL_COUNTDOWN,
      lowestCountdown: INITIAL_LOWEST_COUNTDOWN,
      highestCountdown: INITIAL_HIGHEST_COUNTDOWN
    };
  }

  getCurrentCountdownValue() {
    if (!this.state.clientWithLowestEstimationActive && !this.state.clientWithHighestEstimationActive) {
      return this.state.globalCountdown;
    } else if (this.state.clientWithLowestEstimationActive) {
      return this.state.lowestCountdown;
    } else {
      return this.state.highestCountdown;
    }
  }

  getCurrentClient() {
    const clients = new ClientCollection(this.props.clients);

    if (this.state.clientWithLowestEstimationActive) {
      return <Client showEstimation {...clients.clientWithLowestEstimation()}/>;
    } else if (this.state.clientWithHighestEstimationActive) {
      return <Client showEstimation {...clients.clientWithHighestEstimation()}/>;
    }

    return (
      <div>
        <Client showEstimation {...clients.clientWithLowestEstimation()}/>
        <Client showEstimation {...clients.clientWithHighestEstimation()}/>
      </div>
    );
  }

  render() {
    return (
      <div>
        <LinearProgress
          variant={"determinate"}
          color={"primary"}
          value={this.getCurrentCountdownValue() * 100 / INITIAL_GLOBAL_COUNTDOWN}
        />

        {this.getCurrentClient()}
      </div>
    );
  }

  componentDidMount() {
    const start = createCountdown(this, "globalCountdown", 3);

    start.then(() => {
      this.setState({
        clientWithLowestEstimationActive: true
      });

      return createCountdown(this, "lowestCountdown", 3);
    }).then(() => {
      this.setState({
        clientWithLowestEstimationActive: false
      });

      return createCountdown(this, "globalCountdown", 3);
    }).then(() => {
      this.setState({
        clientWithHighestEstimationActive: true
      });

      return createCountdown(this, "highestCountdown", 5);
    }).then(() => {
      this.setState({
        clientWithHighestEstimationActive: false
      });

      setTimeout(this.props.redirectToDashboard, 5000);
    });
  }
}

const mapStateToProps = state => ({
  clients: state.clients
});

const mapDispatchToProps = dispatch => ({
  redirectToDashboard: () => {
    dispatch(push({pathname: "/dashboard"}));
    dispatch(resetEstimations());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Arena);
