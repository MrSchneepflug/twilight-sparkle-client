import React, {Component} from 'react';
import remove from "lodash";

import Client from "../Websocket/Client";
import TeamSelection from "./TeamSelection";
import DeveloperSelection from "./DeveloperSelection";
import EstimationSelection from "./EstimationSelection"

class MobileApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      team: null,
      developer: null,
      estimation: null,
      selectedDevelopers: []
    };

    this.client = new Client(() => {
      this.setState({
        connected: true
      });
    });

    this.client.on("update", payload => {
      this.setState({
        selectedDevelopers: Object.keys(payload.state)
      });
    });

    this.client.on("reset", payload => {
      this.setState({
        team: null,
        developer: null,
        estimation: null,
        selectedDevelopers: []
      });
    });

    this.teamSelectionHandler = this.teamSelectionHandler.bind(this);
    this.resetTeamSelectionHandler = this.resetTeamSelectionHandler.bind(this);
    this.developerSelectionHandler = this.developerSelectionHandler.bind(this);
    this.resetDeveloperSelectionHandler = this.resetDeveloperSelectionHandler.bind(this);
    this.estimationSelectionHandler = this.estimationSelectionHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
  }

  teamSelectionHandler(team) {
    this.setState({
      team: team
    });
  }

  resetTeamSelectionHandler() {
    this.setState({
      team: null
    });
  }

  developerSelectionHandler(name) {
    this.setState({
      developer: name
    });

    this.client.selectDeveloper(name);
  }

  resetDeveloperSelectionHandler() {
    this.client.resetDeveloperSelection(this.state.developer);

    let selectedDevelopers = [...this.state.selectedDevelopers];
    remove(selectedDevelopers, selectedDeveloper => selectedDeveloper === this.state.developer);

    this.setState({
      developer: null,
      estimation: null,
      selectedDevelopers: selectedDevelopers
    });
  }

  estimationSelectionHandler(estimation) {
    this.setState({
      estimation: estimation
    });

    this.client.selectEstimation(this.state.developer, estimation);
  }

  resetHandler() {
    this.setState({
      team: null,
      developer: null,
      estimation: null
    });

    this.client.reset();
  }

  renderLoadingScreen() {
    return (
      <div>
        <strong>Connecting to server ...</strong>
      </div>
    );
  }

  renderTeamSelection() {
    return (
      <TeamSelection teamSelectionHandler={this.teamSelectionHandler}/>
    );
  }

  renderDeveloperSelection() {
    return (
      <DeveloperSelection
        selectedTeam={this.state.team}
        selectedDeveloper={this.state.developer}
        selectedDevelopers={this.state.selectedDevelopers}
        developerSelectionHandler={this.developerSelectionHandler}
        resetTeamSelectionHandler={this.resetTeamSelectionHandler}
      />
    );
  }

  renderEstimationSelection() {
    return (
      <EstimationSelection
        selectedEstimation={this.state.estimation}
        estimationSelectionHandler={this.estimationSelectionHandler}
        resetHandler={this.resetHandler}
        resetDeveloperSelectionHandler={this.resetDeveloperSelectionHandler}
      />
    );
  }

  render() {
    if (!this.state.connected) {
      return this.renderLoadingScreen();
    }

    if (!this.state.team) {
      return this.renderTeamSelection();
    }

    if (!this.state.developer) {
      return this.renderDeveloperSelection();
    }

    return this.renderEstimationSelection();
  }
}

export default MobileApp;
