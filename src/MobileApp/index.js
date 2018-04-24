import React, {Component} from "react";
import AppShell from "../shared/AppShell";
import {connect} from "react-redux";
import Pathname from "../shared/Pathname";
import * as Scenes from "./scenes";
import * as SharedScenes from "../shared/scenes";

class MobileApp extends Component {
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

    if (pathname.matchesEstimationRevelation()) {
      return "My Estimation";
    }

    if (pathname.matchesEstimationExplanation()) {
      return "Estimation Explanation";
    }

    return "No title defined";
  };

  renderScene = () => {
    const pathname = new Pathname(this.props.location.pathname);

    if (pathname.matchesTeamSelection()) {
      return <Scenes.TeamSelection/>;
    }

    if (pathname.matchesDeveloperSelection()) {
      return <Scenes.DeveloperSelection/>;
    }

    if (pathname.matchesEstimationSelection()) {
      return <Scenes.EstimationSelection/>;
    }

    if (pathname.matchesEstimationRevelation()) {
      return <Scenes.EstimationRevelation/>;
    }

    if (pathname.matchesEstimationExplanation()) {
      return <Scenes.EstimationExplanation/>;
    }
  };

  render() {
    if (!this.props.connected) {
      return <SharedScenes.Loading/>;
    }

    return (
      <AppShell title={this.getSceneTitle()}>
        {this.renderScene()}
      </AppShell>
    );
  }
}

const mapStateToProps = state => ({
  connected: state.connected,
  location: state.location
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MobileApp);
