import React, {Component} from "react";
import {connect} from "react-redux";
import Client from "./Client";

class Dashboard extends Component {
  renderDeveloperRows() {
    return this.props.clients.map(client => {
      return (
        <Client
          id={client.id}
          name={client.developer}
          estimation={client.estimation}
          key={client.developer}
        />
      );
    });
  }

  render() {
    return (
      <table>
        <tbody>
        <tr>
          <td>ID</td>
          <td>Developer</td>
          <td>Estimation</td>
        </tr>
        {this.renderDeveloperRows()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
