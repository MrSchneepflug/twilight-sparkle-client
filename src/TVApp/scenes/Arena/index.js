import React, {Component} from "react";
import {connect} from "react-redux";
import Developer from "./Developer";
import ClientCollection from "../../../shared/ClientCollection";
import push from "../../../shared/actions/history/push";

class Arena extends Component {
  constructor(props) {
    super(props);

    this.state = {
      globalCountdown: 3,
      lowestCountdown: 3,
      highestCountdown: 3
    };
  }

  render() {
    const clients = new ClientCollection(this.props.clients);
    const clientWithLowestEstimation = clients.clientWithLowestEstimation();
    const clientWithHighestEstimation = clients.clientWithHighestEstimation();

    return (
      <div>
        Countdown: {this.state.globalCountdown}

        <table>
          <tbody>
          <tr>
            <Developer {...clientWithLowestEstimation} countdown={this.state.lowestCountdown}/>
          </tr>
          <tr>
            <Developer {...clientWithHighestEstimation} countdown={this.state.highestCountdown}/>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }

  componentDidMount() {
    const createCountdown = type => {
      return resolve => {
        const interval = setInterval(() => {
          if (this.state[type] > 0) {
            this.setState({
              [type]: this.state[type] - 1
            });
          } else {
            clearInterval(interval);

            this.setState({
                [type]: 3
            });

            resolve();
          }
        }, 1000);
      };
    };

    const start = new Promise(createCountdown("globalCountdown"));

    start.then(() => {
      return new Promise(createCountdown("lowestCountdown"));
    }).then(() => {
      return new Promise(createCountdown("globalCountdown"));
    }).then(() => {
      return new Promise(createCountdown("highestCountdown"));
    }).then(() => {
      setTimeout(this.props.redirectToDashboard, 5000);
    });
  }
}

const mapStateToProps = state => ({
  clients: state.clients
});

const mapDispatchToProps = dispatch => ({
  redirectToDashboard: () => dispatch(push({pathname: "/dashboard"})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Arena);
