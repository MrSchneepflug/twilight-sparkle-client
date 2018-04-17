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
      redirectToArena: false,
      redirectToDashboard: false
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
          active={this.state.redirectToArena}
          onFinish={this.props.redirectToArena}/>

        <Countdown
          initialValue={5}
          active={this.state.redirectToDashboard}
          onFinish={this.props.redirectToDashboard}/>
      </div>
    );
  }

  componentDidMount() {
    const clients = new ClientCollection(this.props.clients);

    if (clients.haveEstimatedCloseEnough()) {
      this.setState({
        redirectToDashboard: true
      });
    } else {
      this.setState({
        redirectToArena: true
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
