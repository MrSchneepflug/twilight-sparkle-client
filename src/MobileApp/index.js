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
    switch (this.props.location.pathname) {
      case "/":
        return <Scenes.Home />;
      case "/teams":
        return <Scenes.TeamSelection />;
      case "/developers":
        const team = this.extractTeamFromQueryString();
        return <Scenes.DeveloperSelection team={team}/>;
      case "/estimation":
        return <Scenes.EstimationSelection />;
    }
  };

  extractTeamFromQueryString() {
    const queryString = this.props.location.search;
    const matchResult = queryString.match(/team=(\w+)/);

    if (matchResult === null) {
      throw new Error("Could not extract team from query-string");
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
