import React, {Component} from 'react';
import {connect} from "react-redux";

import {
  hasConnected,
  hasResetDeveloperSelection,
  hasSelectedEstimation,
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

    this.client.on("update", payload => this.props.hasUpdated(payload.state));
    this.client.on("reset", this.props.hasReset);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.developer !== nextProps.developer && nextProps.developer !== null) {
      this.client.selectDeveloper(nextProps.developer);
    }

    if (this.props.developer !== null && nextProps.developer === null) {
      this.client.resetDeveloperSelection(this.props.developer);
    }

    if (this.props.estimation !== nextProps.estimation && nextProps.estimation !== null) {
      this.client.selectEstimation(this.props.developer, nextProps.estimation);
    }
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
        <TeamSelection/>
      );
    }

    if (!this.props.developer) {
      return (
        <DeveloperSelection
          selectedTeam={this.props.team}
          selectedDeveloper={this.props.developer}
          selectedDevelopers={this.props.selectedDevelopers}
        />
      );
    }

    return (
      <EstimationSelection
        selectedDeveloper={this.props.developer}
        selectedEstimation={this.props.estimation}
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
  hasConnected: () => dispatch(hasConnected()),
  hasResetDeveloperSelection: previousDeveloper => dispatch(hasResetDeveloperSelection(previousDeveloper)),
  hasSelectedEstimation: estimation => dispatch(hasSelectedEstimation(estimation)),
  hasUpdated: state => dispatch(hasUpdated(state)),
  hasReset: () => dispatch(hasReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileApp);
