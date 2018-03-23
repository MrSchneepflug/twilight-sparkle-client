import React, { Component } from "react";
import AppShell from "./AppShell";
import { connect } from "react-redux";
import { connectToWebsocketServer, update } from "../shared/actions";
import MobileClient from "../Websocket/MobileClient";
import Pathname from "../shared/Pathname";
import * as Scenes from "./scenes";
import * as SharedScenes from "../shared/scenes";
import { replace } from "../shared/actions/history";

class MobileApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      developer: null
    };

    this.client = new MobileClient(this.props.connectToWebsocketServer);
    this.client.on("update", state => this.props.update(state));
  }

  getSceneTitle = () => {
    const pathname = new Pathname(this.props.location.pathname);

    if (pathname.matchesLoadingScreen()) {
      return "Hang on!";
    }

    if (pathname.matchesTeamSelection()) {
      return "Choose Your Team";
    }

    if (pathname.matchesDeveloperSelection()) {
      return "Select Developer";
    }

    if (pathname.matchesEstimationSelection()) {
      return "Estimate!";
    }

    return "No title defined";
  };

  renderScene = () => {
    const pathname = new Pathname(this.props.location.pathname);

    if (pathname.matchesLoadingScreen()) {
      return <SharedScenes.Loading />;
    }

    if (pathname.matchesTeamSelection()) {
      return <Scenes.TeamSelection />;
    }

    if (pathname.matchesDeveloperSelection()) {
      const team = pathname.extractTeam();
      return <Scenes.DeveloperSelection team={team}/>;
    }

    if (pathname.matchesEstimationSelection()) {
      return <Scenes.EstimationSelection />;
    }
  };

  render() {
    return (
      <AppShell title={this.getSceneTitle()}>
        {this.renderScene()}
      </AppShell>
    );
  }

  componentDidUpdate(prevProps) {
    const pathname = new Pathname(this.props.location.pathname);

    if (pathname.matchesLoadingScreen() && !prevProps.connected && this.props.connected) {
      this.props.redirectToTeamSelection();
    }

    if (pathname.matchesDeveloperSelection() && this.state.developer !== null) {
      this.client.resetDeveloperSelection(this.state.developer);

      this.setState({
        developer: null
      });
    }

    if (pathname.matchesEstimationSelection() && this.state.developer === null) {
      const developer = pathname.extractDeveloper();

      this.setState({
        developer
      });

      this.client.selectDeveloper(developer);
    }

    if (
      this.props.estimation !== prevProps.estimation &&
      this.props.estimation !== null
    ) {
      this.client.selectEstimation(this.state.developer, this.props.estimation);
    }
  }
}

const mapStateToProps = state => ({
  location: state.location,
  connected: state.connected,
  estimation: state.estimation
});

const mapDispatchToProps = dispatch => ({
  connectToWebsocketServer: () => dispatch(connectToWebsocketServer()),
  update: state => dispatch(update(state)),
  redirectToTeamSelection: () => dispatch(replace({ pathname: "/teams" }))
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileApp);
