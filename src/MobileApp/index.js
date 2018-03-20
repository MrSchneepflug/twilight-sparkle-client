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

    this.state = {
      developer: null
    };

    this.client = new MobileClient(this.props.connectToWebsocketServer);
    this.client.on("update", state => this.props.update(state));
  }

  componentWillReceiveProps(nextProps) {
    if (this.pathnameMatchesDeveloperSelection(nextProps.location.pathname) && this.state.developer !== null) {
      this.client.resetDeveloperSelection(this.state.developer);

      this.setState({
        developer: null
      });
    }

    if (this.pathnameMatchesEstimationSelection(nextProps.location.pathname)) {
      const developer = this.extractDeveloperFromPathname(nextProps.location.pathname);

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

    if (pathname === "/") {
      return <Scenes.Home />;
    }

    if (pathname === "/teams") {
      return <Scenes.TeamSelection />;
    }

    if (this.pathnameMatchesDeveloperSelection(this.props.location.pathname)) {
      const team = this.extractTeamFromPathname(this.props.location.pathname);
      return <Scenes.DeveloperSelection team={team}/>;
    }

    if (this.pathnameMatchesEstimationSelection(this.props.location.pathname)) {
      return <Scenes.EstimationSelection />;
    }
  };

  pathnameMatchesDeveloperSelection(pathname) {
    return /^\/teams\/\w+\/developers$/.test(pathname);
  }

  pathnameMatchesEstimationSelection(pathname) {
    return /^\/teams\/\w+\/developers\/\w+\/estimation$/.test(pathname);
  }

  extractTeamFromPathname(pathname) {
    const matchResult = pathname.match(/teams\/(\w+)/);

    if (matchResult === null) {
      throw new Error("Could not extract team from URI");
    }

    return matchResult[1];
  }

  extractDeveloperFromPathname(pathname) {
    const matchResult = pathname.match(/^\/teams\/\w+\/developers\/(\w+)/);

    if (matchResult === null) {
      throw new Error("Could not extract developer from pathname");
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
  estimation: state.estimation
});

const mapDispatchToProps = dispatch => ({
  connectToWebsocketServer: () => dispatch(connectToWebsocketServer()),
  update: state => dispatch(update(state)),
  redirectToTeamSelection: () => dispatch(push({ pathname: "/teams" }))
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileApp);
