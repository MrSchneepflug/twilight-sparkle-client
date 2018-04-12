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
      isGlobalCountdownActive: true,
      isLowestCountdownActive: false,
      isHighestCountdownActive: false
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
              isLowestCountdownActive: !this.state.isLowestCountdownActive,
              isHighestCountdownActive: this.state.isLowestCountdownActive
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
                  isGlobalCountdownActive: true
                })
              }}/>
          </tr>
          <tr>
            <Developer {...clientWithHighestEstimation}/>
            <Countdown
              active={this.state.isHighestCountdownActive}
              onFinish={() => {
                setTimeout(this.props.redirectToDashboard, 5000);
              }}/>
          </tr>
          </tbody>
        </table>
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
