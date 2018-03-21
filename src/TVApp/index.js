import React, {Component} from 'react';
import {connect} from "react-redux";
import {connectToWebsocketServer, update} from "../shared/actions";
import {push} from "../shared/actions/history";
import Pathname from "../shared/Pathname";

import TVClient from "../Websocket/TVClient";
import * as Scenes from "./scenes";
import * as SharedScenes from "../shared/scenes";

class TVApp extends Component {
  constructor(props) {
    super(props);

    this.client = new TVClient(this.props.connectToWebsocketServer);
    this.client.on("update", state => this.props.update(state));
  }

  componentWillUpdate(nextProps) {
    const pathname = new Pathname(this.props.location.pathname);

    if (pathname.matchesLoadingScreen() && !this.props.connected && nextProps.connected) {
      this.props.redirectToDashboard();
    }
  }

  render() {
    const pathname = new Pathname(this.props.location.pathname);

    if (pathname.matchesLoadingScreen()) {
      return <SharedScenes.Loading/>;
    }

    if (pathname.matchesDashboard()) {
      if (this.eachDeveloperHasEstimation()) {
        return <Scenes.Estimations/>;
      } else {
        return <Scenes.Dashboard/>;
      }
    }
  }

  eachDeveloperHasEstimation() {
    return this.props.clients.reduce((result, client) => result && client.estimation, true);
  }
}

const mapStateToProps = state => ({
  location: state.location,
  connected: state.connected,
  clients: state.clients
});

const mapDispatchToProps = dispatch => ({
  connectToWebsocketServer: () => dispatch(connectToWebsocketServer()),
  update: state => dispatch(update(state)),
  redirectToDashboard: () => dispatch(push({ pathname: "/dashboard" }))
});

export default connect(mapStateToProps, mapDispatchToProps)(TVApp);
