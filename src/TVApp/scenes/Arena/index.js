import React, {Component} from "react";
import {connect} from "react-redux";
import Developer from "./Developer";
import ClientCollection from "../../../shared/ClientCollection";
import push from "../../../shared/actions/history/push";

class Arena extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countdown: 3,
      countdownLowestEstimation: 3,
      countdownHighestEstimation: 3
    };
  }

  render() {
    const clients = new ClientCollection(this.props.clients);
    const clientWithLowestEstimation = clients.clientWithLowestEstimation();
    const clientWithHighestEstimation = clients.clientWithHighestEstimation();

    return (
      <div>
        Countdown: {this.state.countdown}

        <table>
          <tbody>
            <tr>
              <Developer {...clientWithLowestEstimation} countdown={this.state.countdownLowestEstimation} />
            </tr>
            <tr>
              <Developer {...clientWithHighestEstimation} countdown={this.state.countdownHighestEstimation} />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  componentDidMount() {
    const start = new Promise(resolve => {
      const interval = setInterval(() => {
        if (this.state.countdown > 0) {
          this.setState({
            countdown: this.state.countdown - 1
          });
        } else {
          clearInterval(interval);
          this.setState({
            countdown: 3
          });
          resolve();
        }
      }, 1000)
    });

    start.then(() => {
      return new Promise(resolve => {
        const interval = setInterval(() => {
          if (this.state.countdownLowestEstimation > 0) {
            this.setState({
              countdownLowestEstimation: this.state.countdownLowestEstimation - 1
            });
          } else {
            clearInterval(interval);
            resolve();
          }
        }, 1000);
      });
    }).then(() => {
      return new Promise(resolve => {
        const interval = setInterval(() => {
          if (this.state.countdown > 0) {
            this.setState({
              countdown: this.state.countdown - 1
            });
          } else {
            clearInterval(interval);
            this.setState({
              countdown: 3
            });
            resolve();
          }
        }, 1000)
      });
    }).then(() => {
      return new Promise(resolve => {
        const interval = setInterval(() => {
          if (this.state.countdownHighestEstimation > 0) {
            this.setState({
              countdownHighestEstimation: this.state.countdownHighestEstimation - 1
            });
          } else {
            clearInterval(interval);
            resolve();
          }
        }, 1000);
      });
    }).then(() => {
      setTimeout(() => {
        this.props.redirectToDashboard();
      }, 5000);
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
