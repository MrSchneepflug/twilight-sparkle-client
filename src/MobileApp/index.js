import React, { Component } from "react";
import AppShell from "./AppShell";
import { connect } from "react-redux";
import { connectToWebsocketServer, update } from "../shared/actions";
import MobileClient from "../Websocket/MobileClient";
import * as Scenes from "./scenes";

class MobileApp extends Component {
  constructor(props) {
    super(props);

    this.client = new MobileClient(this.props.connectToWebsocketServer);
    this.client.on("update", state => this.props.update(state));
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.developer !== nextProps.developer &&
      nextProps.developer !== null
    ) {
      this.client.selectDeveloper(nextProps.developer);
    }

    if (
      this.props.estimation !== nextProps.estimation &&
      nextProps.estimation !== null
    ) {
      this.client.selectEstimation(this.props.developer, nextProps.estimation);
    }

    if (this.props.developer !== null && nextProps.developer === null) {
      this.client.resetDeveloperSelection(this.props.developer);
    }
  }

  getSceneTitle = () => {
    if (!this.props.connected) {
      return "Hang on!";
    }

    if (!this.props.team) {
      return "Choose Your Team";
    }

    if (!this.props.developer) {
      return "Select Developer";
    }

    return "Estimate!";
  };

  renderScene = () => {
    /*
    if (!this.props.connected) {
      return <Scenes.Home />;
    }

    if (!this.props.team) {
      return <Scenes.TeamSelection />;
    }

    if (!this.props.developer) {
      return <Scenes.DeveloperSelection />;
    }

    return <Scenes.EstimationSelection />;
    */

    switch (this.props.location.pathname) {
      case "/":
        return this.props.connected
          ? <Scenes.TeamSelection />
          : <Scenes.Home />;
      // @todo: /developers/einhorn ?
      case "/developers":
        return <Scenes.DeveloperSelection />;
    }
  };

  render() {
    return (
      <AppShell title={this.getSceneTitle()}>
        {this.renderScene()}
      </AppShell>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location,
  connected: state.connected,
  team: state.team,
  developer: state.developer,
  estimation: state.estimation
});

const mapDispatchToProps = dispatch => ({
  connectToWebsocketServer: () => dispatch(connectToWebsocketServer()),
  update: state => dispatch(update(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileApp);
