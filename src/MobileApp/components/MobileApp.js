import React, {Component} from 'react';
import {connect} from "react-redux";
import {connectToWebsocketServer, update, reset} from "../../shared/actions";
import MobileClient from "../../Websocket/MobileClient";
import TeamSelection from "./TeamSelection";
import DeveloperSelection from "./DeveloperSelection";
import EstimationSelection from "./EstimationSelection"

class MobileApp extends Component {
  constructor(props) {
    super(props);

    this.client = new MobileClient(this.props.connectToWebsocketServer);
    this.client.on("update", payload => this.props.update(payload.state));
    this.client.on("reset", this.props.reset);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.developer !== nextProps.developer && nextProps.developer !== null) {
      this.client.selectDeveloper(nextProps.developer);
    }

    if (this.props.estimation !== nextProps.estimation && nextProps.estimation !== null) {
      this.client.selectEstimation(this.props.developer, nextProps.estimation);
    }

    if (this.props.developer !== null && nextProps.developer === null) {
      this.client.resetDeveloperSelection(this.props.developer);
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
      return <TeamSelection/>;
    }

    if (!this.props.developer) {
      return <DeveloperSelection/>;
    }

    return <EstimationSelection/>;
  }
}

const mapStateToProps = state => ({
  connected: state.connected,
  team: state.team,
  developer: state.developer,
  estimation: state.estimation
});

const mapDispatchToProps = dispatch => ({
  connectToWebsocketServer: () => dispatch(connectToWebsocketServer()),
  update: state => dispatch(update(state)),
  reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileApp);
