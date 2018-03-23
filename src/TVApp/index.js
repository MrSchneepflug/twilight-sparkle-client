import React, {Component} from 'react';
import {connect} from "react-redux";
import {connectToWebsocketServer, update} from "../shared/actions";
import {push, replace} from "../shared/actions/history";
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

  render() {
    const pathname = new Pathname(this.props.location.pathname);

    if (pathname.matchesLoadingScreen()) {
      return <SharedScenes.Loading/>;
    }

    if (pathname.matchesDashboard()) {
      return <Scenes.Dashboard/>;
    }

    if (pathname.matchesEstimations()) {
      return <Scenes.Estimations/>
    }
  }

  componentDidUpdate(prevProps) {
    const pathname = new Pathname(this.props.location.pathname);

    if (pathname.matchesLoadingScreen() && !prevProps.connected && this.props.connected) {
      this.props.redirectToDashboard();
    }

    if (!this.eachClientHasEstimation(prevProps.clients) && this.eachClientHasEstimation(this.props.clients)) {
      this.props.redirectToEstimations();
    }
  }

  eachClientHasEstimation(clients) {
    return clients.reduce((result, client) => result && client.estimation, true);
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
  redirectToDashboard: () => dispatch(replace({ pathname: "/dashboard" })),
  redirectToEstimations: () => dispatch(push({ pathname: "/estimations" }))
});

export default connect(mapStateToProps, mapDispatchToProps)(TVApp);
