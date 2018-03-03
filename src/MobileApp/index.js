import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { connectToWebsocketServer, update } from "../shared/actions";
import MobileClient from "../Websocket/MobileClient";
import { Home, TeamSelection, DeveloperSelection, EstimationSelection } from "./scenes";

class MobileApp extends Component {
  constructor(props) {
    super(props);

    this.client = new MobileClient(this.props.connectToWebsocketServer);
    this.client.on("update", state => this.props.update(state));
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.developer !== nextProps.developer &&
      nextProps.developer !== null
    ) {
      this.client.selectDeveloper(nextProps.developer);
    }

    if (
      this.props.estimation !== nextProps.estimation &&
      nextProps.estimation !== null
    ) {
      this.client.selectEstimation(this.props.developer, nextProps.estimation);
    }

    if (this.props.developer !== null && nextProps.developer === null) {
      this.client.resetDeveloperSelection(this.props.developer);
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/teams" component={TeamSelection} />
          <Route path="/developers" component={DeveloperSelection} />
          <Route path="/estimation" component={EstimationSelection} />

          <Switch>
            {this.props.developer && <Redirect to="/estimation" />}
            {this.props.team && <Redirect to="/developers" />}
            {this.props.connected && <Redirect to="/teams" />}
          </Switch>
        </div>
      </Router>
    );
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
  update: state => dispatch(update(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileApp);
