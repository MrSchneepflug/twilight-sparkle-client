import React, {Component} from 'react';
import {connect} from "react-redux";
import {hasConnected, hasUpdated, hasReset} from "./actions/index";

import TVClient from "../Websocket/TVClient";
import Developer from "./Developer";

class TVApp extends Component {
  constructor(props) {
    super(props);

    this.client = new TVClient(() => this.props.hasConnected());
    this.client.on("update", payload => this.props.hasUpdated(payload.state));
    this.client.on("reset", () => this.props.hasReset());
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
  hasConnected: () => dispatch(hasConnected()),
  hasUpdated: state => dispatch(hasUpdated(state)),
  hasReset: () => dispatch(hasReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(TVApp);
