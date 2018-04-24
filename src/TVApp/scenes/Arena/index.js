import React, {Component} from "react";
import {connect} from "react-redux";
import {Countdown, Client} from "../../../shared/components";
import ClientCollection from "../../../shared/ClientCollection";
import push from "../../../shared/actions/history/push";
import resetEstimations from "../../actions/resetEstimations";

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
        </div>

        <div>
          <Client showEstimation {...clientWithLowestEstimation}/>
          <Countdown
            active={this.state.isLowestCountdownActive}
            onFinish={() => {
              this.setState({
                previousCountdownWasLowestCountdown: true,
                isGlobalCountdownActive: true,
                isLowestCountdownActive: false
              })
            }}/>
        </div>

        <div>
          <Client showEstimation {...clientWithHighestEstimation}/>
          <Countdown
            active={this.state.isHighestCountdownActive}
            onFinish={() => {
              this.setState({
                isRedirectCountdownActive: true,
                isHighestCountdownActive: false
              })
            }}/>
        </div>

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
  redirectToDashboard: () => {
    dispatch(push({pathname: "/dashboard"}));
    dispatch(resetEstimations());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Arena);
