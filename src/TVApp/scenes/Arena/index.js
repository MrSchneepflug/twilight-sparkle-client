import React, {Component} from "react";
import {connect} from "react-redux";
import {LinearProgress} from "material-ui";
import {Client} from "../../../shared/components";
import ClientCollection from "../../../shared/ClientCollection";
import push from "../../../shared/actions/history/push";
import resetEstimations from "../../actions/resetEstimations";

const INITIAL_GLOBAL_COUNTDOWN = 3;
const INITIAL_LOWEST_COUNTDOWN = 3;
const INITIAL_HIGHEST_COUNTDOWN = 3;

class Arena extends Component {
  constructor(props) {
    super(props);

    this.state = {
      globalCountdown: INITIAL_GLOBAL_COUNTDOWN,
      lowestCountdown: INITIAL_LOWEST_COUNTDOWN,
      highestCountdown: INITIAL_HIGHEST_COUNTDOWN
    };
  }

  render() {
    const clients = new ClientCollection(this.props.clients);
    const clientWithLowestEstimation = clients.clientWithLowestEstimation();
    const clientWithHighestEstimation = clients.clientWithHighestEstimation();

    return (
      <div>
        <div>
          Countdown: {this.state.globalCountdown}
          <LinearProgress
            variant={"determinate"}
            color={"primary"}
            value={this.state.globalCountdown * 100 / INITIAL_GLOBAL_COUNTDOWN}
          />
        </div>

        <div>
          <Client showEstimation {...clientWithLowestEstimation}/>
          <LinearProgress
            variant={"determinate"}
            color={"primary"}
            value={this.state.lowestCountdown * 100 / INITIAL_LOWEST_COUNTDOWN}
          />
        </div>

        <div>
          <Client showEstimation {...clientWithHighestEstimation}/>
          <LinearProgress
            variant={"determinate"}
            color={"primary"}
            value={this.state.highestCountdown * 100 / INITIAL_HIGHEST_COUNTDOWN}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const createCountdown = (type, initialValue) => {
      return resolve => {
        const interval = setInterval(() => {
          if (this.state[type] > 0) {
            this.setState({
              [type]: this.state[type] - 1
            });
          } else {
            clearInterval(interval);

            this.setState({
              [type]: initialValue
            });

            resolve();
          }
        }, 1000);
      };
    };

    const start = new Promise(createCountdown("globalCountdown", 3));

    start.then(() => {
      return new Promise(createCountdown("lowestCountdown", 3));
    }).then(() => {
      return new Promise(createCountdown("globalCountdown", 3));
    }).then(() => {
      return new Promise(createCountdown("highestCountdown", 5));
    }).then(() => {
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
