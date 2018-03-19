import React, { Component } from "react";
import AppShell from "./AppShell";
import { connect } from "react-redux";
import { connectToWebsocketServer, update } from "../shared/actions";
import MobileClient from "../Websocket/MobileClient";
import * as Scenes from "./scenes";
import { push } from "../shared/actions/history";

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
    switch (this.props.location.pathname) {
      case "/":
        return this.props.connected
          ? "Choose Your Team"
          : "Hang on!";
      case "/developers":
          return "Select Developer";
      case "/estimation":
          return "Estimate";
    }

    return "No title defined";
  };

  renderScene = () => {
    const pathname = this.props.location.pathname;

    if (/developers\/\w+\/estimation/.test(pathname)) {
      return <Scenes.EstimationSelection />;
    }

    if (/teams\/\w+\/developers/.test(pathname)) {
      const team = this.extractTeamFromURI();
      return <Scenes.DeveloperSelection team={team}/>;
    }

    if (pathname === "/teams") {
      return <Scenes.TeamSelection />;
    }

    if (pathname === "/") {
      return <Scenes.Home />;
    }
  };

  extractTeamFromURI() {
    const matchResult = this.props.location.pathname.match(/teams\/(\w+)/);

    if (matchResult === null) {
      throw new Error("Could not extract team from URI");
    }

    return matchResult[1];
  }

  componentWillUpdate(nextProps) {
    if (this.props.location.pathname === "/" && !this.props.connected && nextProps.connected) {
      this.props.redirectToTeamSelection();
    }
  }

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
  update: state => dispatch(update(state)),
  redirectToTeamSelection: () => dispatch(push({ pathname: "/teams" }))
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileApp);
