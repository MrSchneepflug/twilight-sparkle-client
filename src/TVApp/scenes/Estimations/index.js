import React, {Component} from "react";
import {connect} from "react-redux";
import Estimation from "./Estimation";

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
}

const mapStateToProps = state => ({
  clients: state.clients
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Estimations);
