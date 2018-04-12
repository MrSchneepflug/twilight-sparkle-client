import React, {Component} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {Avatar} from "material-ui";
import {withStyles} from "material-ui/styles";
import push from "../../../shared/actions/history/push";
import ClientCollection from "../../../shared/ClientCollection";

class Dashboard extends Component {
  renderDeveloperRows() {
    return this.props.clients.map(client => {
      return (
        <Developer
          id={client.id}
          name={client.developer}
          key={client.id}
        />
      );
    });
  }

  render() {
    return (
      <table>
        <tbody>
        <tr>
          <td>ID</td>
          <td>Developer</td>
        </tr>
        {this.renderDeveloperRows()}
        </tbody>
      </table>
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
  },
  avatarContainer: {
    margin: "10px"
  },
  avatarWithSelectedDeveloper: {
    backgroundColor: "#2196F3"
  },
  avatarWithEstimation: {
    backgroundColor: "#4CAF50"
  }
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);
