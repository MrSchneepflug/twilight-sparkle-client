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
      lowestCountdown: 5,
      highestCountdown: 5
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
      return new Promise(createCountdown("lowestCountdown", 5));
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
  redirectToDashboard: () => dispatch(push({pathname: "/dashboard"})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Arena);
