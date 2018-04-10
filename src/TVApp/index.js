import React, {Component} from 'react';
import {connect} from "react-redux";
import Pathname from "../shared/Pathname";
import * as Scenes from "./scenes";
import * as SharedScenes from "../shared/scenes";

class TVApp extends Component {
  render() {
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
}

const mapStateToProps = state => ({
  connected: state.connected,
  location: state.location
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TVApp);
