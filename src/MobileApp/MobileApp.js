import React, {Component} from 'react';
import {connect} from "react-redux";
import remove from "lodash";

import {
  hasConnected,
  hasSelectedTeam,
  hasResetTeamSelection,
  hasSelectedDeveloper,
  hasResetDeveloperSelection,
  hasSelectedEstimation,
  hasSelectedDevelopers,
  hasUpdated,
  hasReset
} from "./actions";

import MobileClient from "../Websocket/MobileClient";
import TeamSelection from "./TeamSelection";
import DeveloperSelection from "./DeveloperSelection";
import EstimationSelection from "./EstimationSelection"

class MobileApp extends Component {
  constructor(props) {
    super(props);

    this.client = new MobileClient(this.props.hasConnected);

    this.client.on("update", payload => {
      this.props.hasUpdated(payload)
    });

    this.client.on("reset", this.props.hasReset);

    this.teamSelectionHandler = this.teamSelectionHandler.bind(this);
    this.resetTeamSelectionHandler = this.resetTeamSelectionHandler.bind(this);
    this.developerSelectionHandler = this.developerSelectionHandler.bind(this);
    this.resetDeveloperSelectionHandler = this.resetDeveloperSelectionHandler.bind(this);
    this.estimationSelectionHandler = this.estimationSelectionHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
  }

  teamSelectionHandler(team) {
    this.props.hasSelectedTeam(team);
  }

  resetTeamSelectionHandler() {
    this.props.hasResetTeamSelection();
  }

  developerSelectionHandler(name) {
    this.props.hasSelectedDeveloper(name);
    this.client.selectDeveloper(name);
  }

  resetDeveloperSelectionHandler() {
    this.client.resetDeveloperSelection(this.props.developer);

    let selectedDevelopers = [...this.props.selectedDevelopers];
    remove(selectedDevelopers, selectedDeveloper => selectedDeveloper === this.props.developer);

    this.setState({
      developer: null,
      estimation: null,
      selectedDevelopers: selectedDevelopers
    });
  }

  estimationSelectionHandler(estimation) {
    this.props.hasSelectedEstimation(estimation);
    this.client.selectEstimation(this.props.developer, estimation);
  }

  resetHandler() {
    this.props.hasReset();
    this.client.reset();
  }

  render() {
    if (!this.props.connected) {
      return (
        <div>
          <strong>Connecting to server ...</strong>
        </div>
      );
    }

    if (!this.props.team) {
      return (
        <TeamSelection teamSelectionHandler={this.teamSelectionHandler}/>
      );
    }

    if (!this.props.developer) {
      return (
        <DeveloperSelection
          selectedTeam={this.props.team}
          selectedDeveloper={this.props.developer}
          selectedDevelopers={this.props.selectedDevelopers}
          developerSelectionHandler={this.developerSelectionHandler}
          resetTeamSelectionHandler={this.resetTeamSelectionHandler}
        />
      );
    }

    return (
      <EstimationSelection
        selectedEstimation={this.props.estimation}
        estimationSelectionHandler={this.estimationSelectionHandler}
        resetHandler={this.resetHandler}
        resetDeveloperSelectionHandler={this.resetDeveloperSelectionHandler}
      />
    );
  }
}

const mapStateToProps = state => ({
  connected: state.connected,
  team: state.team,
  developer: state.developer,
  estimation: state.estimation,
  selectedDevelopers: state.selectedDevelopers
});

const mapDispatchToProps = dispatch => ({
  hasConnected: dispatch(hasConnected()),
  hasSelectedTeam: team => dispatch(hasSelectedTeam(team)),
  hasResetTeamSelection: dispatch(hasResetTeamSelection()),
  hasSelectedDeveloper: developer => dispatch(hasSelectedDeveloper(developer)),
  hasResetDeveloperSelection: dispatch(hasResetDeveloperSelection()),
  hasSelectedEstimation: estimation => dispatch(hasSelectedEstimation(estimation)),
  hasSelectedDevelopers: developers => dispatch(hasSelectedDevelopers(developers)),
  hasUpdated: state => dispatch(hasUpdated(state)),
  hasReset: dispatch(hasReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileApp);
