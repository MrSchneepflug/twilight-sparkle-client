import React, {Component} from 'react';
import {connect} from "react-redux";
import {connectToWebsocketServer, update, reset} from "../../shared/actions";

import TVClient from "../../Websocket/TVClient";
import LoadingScreen from "../../shared/components/LoadingScreen";
import Developer from "./Developer";

class TVApp extends Component {
  constructor(props) {
    super(props);

    this.client = new TVClient(this.props.connect);
    this.client.on("update", payload => this.props.update(payload.state));
    this.client.on("reset", this.props.reset);
  }

  renderDeveloperRows() {
    return Object.keys(this.props.estimationsByDeveloper).map(developerName => {
      return (
        <Developer
          name={developerName}
          estimation={this.props.estimationsByDeveloper[developerName]}
          key={developerName}
        />
      );
    });
  }

  render() {
    if (!this.props.connected) {
      return <LoadingScreen/>;
    }

    return (
      <table>
        <tbody>
        <tr>
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
  connected: state.connected,
  estimationsByDeveloper: state.estimationsByDeveloper
});

const mapDispatchToProps = dispatch => ({
  connectToWebsocketServer: () => dispatch(connectToWebsocketServer()),
  update: state => dispatch(update(state)),
  reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(TVApp);
