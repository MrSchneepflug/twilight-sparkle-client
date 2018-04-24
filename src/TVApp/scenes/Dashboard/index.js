import React, {Component} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withStyles} from "material-ui/styles";
import push from "../../../shared/actions/history/push";
import ClientCollection from "../../../shared/ClientCollection";
import {Client} from "../../../shared/components";

class Dashboard extends Component {
  render() {
    return (
      <div className={this.props.classes.clientContainer}>
        {this.props.clients.map(client => <Client key={client.id} {...client}/>)}
      </div>
    );
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
  clients: state.clients
});

const mapDispatchToProps = dispatch => ({
  redirectToEstimations: () => dispatch(push({pathname: "/estimations"}))
});

const styles = {
  clientContainer: {
    display: "flex"
  }
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);
