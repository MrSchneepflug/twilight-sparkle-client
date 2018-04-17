import React, {Component} from "react";
import {connect} from "react-redux";
import {Client} from "../../components";
import ClientCollection from "../../../shared/ClientCollection";
import push from "../../../shared/actions/history/push";
import {Countdown} from "../../../shared/components";
import {resetEstimations} from "../../actions";

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
        <div>
          {this.props.clients.map(client => <Client showEstimation {...client}/>)}
        </div>

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
  redirectToDashboard: () => {
    dispatch(push({pathname: "/dashboard"}));
    dispatch(resetEstimations());
  },
  redirectToArena: () => dispatch(push({pathname: "/arena"}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Estimations);
