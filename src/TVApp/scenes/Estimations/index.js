import React, {Component} from "react";
import {connect} from "react-redux";
import Estimation from "./Estimation";
import ClientCollection from "../../../shared/ClientCollection";
import push from "../../../shared/actions/history/push";

class Estimations extends Component {
  render() {
    return (
      <table>
        <tbody>
        {this.props.clients.map(client => <Estimation {...client}/>)}
        </tbody>
      </table>
    );
  }

  componentDidMount() {
    const clients = new ClientCollection(this.props.clients);

    if (clients.haveEstimatedCloseEnough()) {
      setTimeout(this.props.redirectToDashboard, 5000);
    } else {
      setTimeout(this.props.redirectToArena, 5000);
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
