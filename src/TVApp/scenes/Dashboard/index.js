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
          key={client.id}
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
