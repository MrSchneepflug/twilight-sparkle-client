import React, {Component} from "react";
import {connect} from "react-redux";
import ClientCollection from "../../../shared/ClientCollection";
import push from "../../../shared/actions/history/push";
import {Client} from "../../../shared/components";
import {resetEstimations, revealEstimations} from "../../actions";
import {LinearProgress} from "material-ui";
import createCountdown from "../../../shared/countdown";

const INITIAL_REDIRECT_COUNTDOWN = 5;

class Estimations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectCountdown: INITIAL_REDIRECT_COUNTDOWN
    };
  }

  render() {
    return (
      <div>
        <div>
          {this.props.clients.map(client => <Client showEstimation key={client.id} {...client}/>)}
        </div>

        <LinearProgress
          variant={"determinate"}
          color={"primary"}
          value={this.state.redirectCountdown * 100 / INITIAL_REDIRECT_COUNTDOWN}
        />
      </div>
    );
  }

  componentDidMount() {
    this.props.revealEstimations();

    const clients = new ClientCollection(this.props.clients);
    const redirectCountdown = createCountdown(this, "redirectCountdown", INITIAL_REDIRECT_COUNTDOWN);

    redirectCountdown.then(() => {
      if (clients.haveEstimatedCloseEnough()) {
        this.props.redirectToDashboard();
      } else {
        this.props.redirectToArena();
      }
    });
  }
}

const mapStateToProps = state => ({
  clients: state.clients
});

const mapDispatchToProps = dispatch => ({
  revealEstimations: () => {
    dispatch(revealEstimations());
  },
  redirectToDashboard: () => {
    dispatch(push({pathname: "/dashboard"}));
    dispatch(resetEstimations());
  },
  redirectToArena: () => dispatch(push({pathname: "/arena"}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Estimations);
