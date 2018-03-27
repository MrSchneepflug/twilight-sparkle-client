import React, { Component } from "react";
import AppShell from "./AppShell";
import { connect } from "react-redux";
import Pathname from "../shared/Pathname";
import * as Scenes from "./scenes";

class MobileApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      developer: null
    };
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

    if (pathname.matchesDeveloperSelection() && this.state.developer !== null) {
      this.props.client.resetDeveloperSelection(this.state.developer);

      this.setState({
        developer: null
      });
    }

    if (pathname.matchesEstimationSelection() && this.state.developer === null) {
      const developer = pathname.extractDeveloper();

      this.setState({
        developer
      });

      this.props.client.selectDeveloper(developer);
    }

    if (
      this.props.estimation !== prevProps.estimation &&
      this.props.estimation !== null
    ) {
      this.props.client.selectEstimation(this.state.developer, this.props.estimation);
    }
  }
}

const mapStateToProps = state => ({
  location: state.location,
  estimation: state.estimation
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileApp);
