import React, {Component} from "react";
import {connect} from "react-redux";
import push from "../../../shared/actions/history/push";
import Developer from "./Developer";
import ClientCollection from "../../../shared/ClientCollection";

class Dashboard extends Component {
  renderDeveloperRows() {
    return this.props.clients.map(client => {
      return (
        <Developer
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

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
