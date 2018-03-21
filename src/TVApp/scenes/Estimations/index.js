import React, {Component} from "react";
import {connect} from "react-redux";

class Estimations extends Component {
  renderEstimation(developer, estimation) {
    return (
      <tr key={developer}>
        <td>{developer}</td>
        <td>{estimation}</td>
      </tr>
    );
  }

  renderEstimations() {
    return this.props.clients.map(client => this.renderEstimation(client.developer, client.estimation));
  }

  render() {
    return (
      <table>
        <tbody>
          {this.renderEstimations()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  clients: state.clients
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Estimations);
