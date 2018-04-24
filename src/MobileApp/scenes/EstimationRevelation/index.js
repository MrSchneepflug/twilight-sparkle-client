import React, {Component} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withStyles} from "material-ui/styles";
import {replace} from "../../../shared/actions/history";
import ClientCollection from "../../../shared/ClientCollection";
import createCountdown from "../../../shared/countdown";
import {LinearProgress} from "material-ui";

const INITIAL_REDIRECT_COUNTDOWN = 5;

class EstimationRevelation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectCountdown: INITIAL_REDIRECT_COUNTDOWN
    };
  }

  render() {
    return (
      <div>
        <strong className={this.props.classes.estimation}>
          {this.props.estimation}
        </strong>

        <LinearProgress
          variant={"determinate"}
          color={"primary"}
          value={this.state.redirectCountdown * 100 / INITIAL_REDIRECT_COUNTDOWN}
        />
      </div>
    );
  }

  componentDidMount() {
    const clients = new ClientCollection(this.props.clients);
    const redirectCountdown = createCountdown(this, "redirectCountdown", INITIAL_REDIRECT_COUNTDOWN);

    redirectCountdown.then(() => {
      if (clients.haveEstimatedCloseEnough()) {
        this.props.redirectToEstimationSelection();
      } else {
        this.props.redirectToEstimationExplanation();
      }
    });
  }
}

const mapStateToProps = state => ({
  estimation: state.estimation,
  clients: state.clients
});

const mapDispatchToProps = dispatch => ({
  redirectToEstimationSelection: () => dispatch(replace({pathname: "/estimations"})),
  redirectToEstimationExplanation: () => dispatch(replace({pathname: "/explanation"}))
});

const styles = {
  estimation: {
    fontSize: "200%"
  }
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(EstimationRevelation);
