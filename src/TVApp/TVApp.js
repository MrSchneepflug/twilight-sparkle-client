import React, {Component} from 'react';
import {connect} from "react-redux";
import {connectToWebsocketServer, update, reset} from "./actions/index";

import TVClient from "../Websocket/TVClient";
import Developer from "./Developer";

class TVApp extends Component {
  constructor(props) {
    super(props);

    this.client = new TVClient(this.props.connect);
    this.client.on("update", payload => this.props.update(payload.state));
    this.client.on("reset", this.props.reset);
  }

  render() {
    if (!this.props.connected) {
      return (
        <div>
          Connecting ...
        </div>
      );
    }

    let developerRows = Object.keys(this.props.estimationsByDeveloper).map(developerName => {
      return (
        <Developer
          name={developerName}
          estimation={this.props.estimationsByDeveloper[developerName]}
          key={developerName}
        />
      );
    });

    return (
      <table>
        <tbody>
        <tr>
          <td>Developer</td>
          <td>Estimation</td>
        </tr>
        {developerRows}
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
