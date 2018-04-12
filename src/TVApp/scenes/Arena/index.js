import React, {Component} from "react";
import {connect} from "react-redux";
import Developer from "./Developer";
import Countdown from "./Countdown";
import ClientCollection from "../../../shared/ClientCollection";
import push from "../../../shared/actions/history/push";

class Arena extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previousCountdownWasLowestCountdown: false,
      isGlobalCountdownActive: true,
      isLowestCountdownActive: false,
      isHighestCountdownActive: false,
      isRedirectCountdownActive: false
    };
  }

  render() {
    const clients = new ClientCollection(this.props.clients);
    const clientWithLowestEstimation = clients.clientWithLowestEstimation();
    const clientWithHighestEstimation = clients.clientWithHighestEstimation();

    return (
      <div>
        Countdown:
        <Countdown
          active={this.state.isGlobalCountdownActive}
          onFinish={() => {
            this.setState({
              isGlobalCountdownActive: false,
              isLowestCountdownActive: !this.state.previousCountdownWasLowestCountdown,
              isHighestCountdownActive: this.state.previousCountdownWasLowestCountdown
            })
          }}
        />

        <table>
          <tbody>
          <tr>
            <Developer {...clientWithLowestEstimation}/>
            <Countdown
              active={this.state.isLowestCountdownActive}
              onFinish={() => {
                this.setState({
                  previousCountdownWasLowestCountdown: true,
                  isGlobalCountdownActive: true,
                  isLowestCountdownActive: false
                })
              }}/>
          </tr>
          <tr>
            <Developer {...clientWithHighestEstimation}/>
            <Countdown
              active={this.state.isHighestCountdownActive}
              onFinish={() => {
                this.setState({
                  isRedirectCountdownActive: true,
                  isHighestCountdownActive: false
                })
              }}/>
          </tr>
          </tbody>
        </table>

        <Countdown
          initialValue={5}
          active={this.state.isRedirectCountdownActive}
          onFinish={this.props.redirectToDashboard}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clients: state.clients
});

const mapDispatchToProps = dispatch => ({
  redirectToDashboard: () => dispatch(push({pathname: "/dashboard"})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Arena);
