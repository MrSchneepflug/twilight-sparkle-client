import React, {Component} from 'react';
import {connect} from "react-redux";
import {push} from "../shared/actions/history";
import Pathname from "../shared/Pathname";
import * as Scenes from "./scenes";

class TVApp extends Component {
  render() {
    const pathname = new Pathname(this.props.location.pathname);

    if (pathname.matchesDashboard()) {
      return <Scenes.Dashboard/>;
    }

    if (pathname.matchesEstimations()) {
      return <Scenes.Estimations/>
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.eachClientHasEstimation(prevProps.clients) && this.eachClientHasEstimation(this.props.clients)) {
      this.props.redirectToEstimations();
    }
  }

  eachClientHasEstimation(clients) {
    return clients.reduce((result, client) => result && client.estimation, true);
  }
}

const mapStateToProps = state => ({
  location: state.location,
  clients: state.clients
});

const mapDispatchToProps = dispatch => ({
  redirectToEstimations: () => dispatch(push({ pathname: "/estimations" }))
});

export default connect(mapStateToProps, mapDispatchToProps)(TVApp);
