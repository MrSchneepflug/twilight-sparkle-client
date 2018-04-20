import React, {Component} from 'react';
import {connect} from "react-redux";
import Pathname from "../shared/Pathname";
import * as Scenes from "./scenes";
import * as SharedScenes from "../shared/scenes";
import AppShell from "../shared/AppShell/index";

class TVApp extends Component {
  getSceneTitle = () => {
    const pathname = new Pathname(this.props.location.pathname);

    if (pathname.matchesLoadingScreen()) {
      return "Hang on!";
    }

    if (pathname.matchesDashboard()) {
      return "Dashboard";
    }

    if (pathname.matchesEstimations()) {
      return "Estimations";
    }

    if (pathname.matchesArena()) {
      return "Arena";
    }

    return "No title defined";
  };

  renderScene() {
    if (!this.props.connected) {
      return <SharedScenes.Loading/>;
    }

    const pathname = new Pathname(this.props.location.pathname);

    if (pathname.matchesDashboard()) {
      return <Scenes.Dashboard/>;
    }

    if (pathname.matchesEstimations()) {
      return <Scenes.Estimations/>
    }

    if (pathname.matchesArena()) {
      return <Scenes.Arena/>
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
  connected: state.connected,
  location: state.location
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TVApp);
