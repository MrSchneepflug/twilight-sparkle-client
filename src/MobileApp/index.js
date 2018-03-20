import React, { Component } from "react";
import AppShell from "./AppShell";
import { connect } from "react-redux";
import { connectToWebsocketServer, update } from "../shared/actions";
import MobileClient from "../Websocket/MobileClient";
import Pathname from "../shared/Pathname";
import * as Scenes from "./scenes";
import { push } from "../shared/actions/history";

class MobileApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      developer: null
    };

    this.client = new MobileClient(this.props.connectToWebsocketServer);
    this.client.on("update", state => this.props.update(state));
  }

  componentWillReceiveProps(nextProps) {
    const pathname = new Pathname(nextProps.location.pathname);

    if (pathname.matchesDeveloperSelection() && this.state.developer !== null) {
      this.client.resetDeveloperSelection(this.state.developer);

      this.setState({
        developer: null
      });
    }

    if (pathname.matchesEstimationSelection()) {
      const developer = pathname.extractDeveloper();

      this.setState({
        developer
      });

      this.client.selectDeveloper(developer);
    }

    if (
      this.props.estimation !== nextProps.estimation &&
      nextProps.estimation !== null
    ) {
      this.client.selectEstimation(this.state.developer, nextProps.estimation);
    }
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
      return <Scenes.Home />;
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
  estimation: state.estimation
});

const mapDispatchToProps = dispatch => ({
  connectToWebsocketServer: () => dispatch(connectToWebsocketServer()),
  update: state => dispatch(update(state)),
  redirectToTeamSelection: () => dispatch(push({ pathname: "/teams" }))
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileApp);
