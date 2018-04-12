import React, {Component} from "react";
import {connect} from "react-redux";
import Estimation from "./Estimation";
import ClientCollection from "../../../shared/ClientCollection";
import push from "../../../shared/actions/history/push";
import {Countdown} from "../../../shared/components";

class Estimations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRedirectCountdownActive: false
    };
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
          {this.props.clients.map(client => <Estimation {...client}/>)}
          </tbody>
        </table>

        <Countdown
          initialValue={5}
          active={this.state.isRedirectCountdownActive}
          onFinish={this.props.redirectToArena}/>
      </div>
    );
  }

  componentDidMount() {
    const clients = new ClientCollection(this.props.clients);

    if (clients.haveEstimatedCloseEnough()) {
      setTimeout(this.props.redirectToDashboard, 5000);
    } else {
      this.setState({
        isRedirectCountdownActive: true
      });
    }
  }
}

const mapStateToProps = state => ({
  clients: state.clients
});

const mapDispatchToProps = dispatch => ({
  redirectToDashboard: () => dispatch(push({pathname: "/dashboard"})),
  redirectToArena: () => dispatch(push({pathname: "/arena"}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Estimations);
