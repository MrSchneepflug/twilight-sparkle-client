import React, {Component} from 'react';
import {connect} from "react-redux";
import {push} from "../shared/actions/history";
import Pathname from "../shared/Pathname";
import ClientCollection from "../shared/ClientCollection";
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

  componentDidUpdate(prevProps) {
    const previousClients = new ClientCollection(prevProps.clients);
    const nextClients = new ClientCollection(this.props.clients);

    if (!previousClients.haveEstimated() && nextClients.haveEstimated()) {
      this.props.redirectToEstimations();
    }
  }
}

const mapStateToProps = state => ({
  connected: state.connected,
  location: state.location,
  clients: state.clients
});

const mapDispatchToProps = dispatch => ({
  redirectToEstimations: () => dispatch(push({pathname: "/estimations"}))
});

export default connect(mapStateToProps, mapDispatchToProps)(TVApp);
