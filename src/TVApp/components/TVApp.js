import React, {Component} from 'react';
import {connect} from "react-redux";
import {connectToWebsocketServer, update, reset} from "../../shared/actions";

import TVClient from "../../Websocket/TVClient";
import LoadingScreen from "../../shared/components/LoadingScreen";
import Dashboard from "./Dashboard";

class TVApp extends Component {
  constructor(props) {
    super(props);

    this.client = new TVClient(this.props.connectToWebsocketServer);
    this.client.on("update", payload => this.props.update(payload.state));
    this.client.on("reset", this.props.reset);
  }

  render() {
    if (!this.props.connected) {
      return <LoadingScreen/>;
    }

    return <Dashboard/>;
  }
}

const mapStateToProps = state => ({
  connected: state.connected
});

const mapDispatchToProps = dispatch => ({
  connectToWebsocketServer: () => dispatch(connectToWebsocketServer()),
  update: state => dispatch(update(state)),
  reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(TVApp);
