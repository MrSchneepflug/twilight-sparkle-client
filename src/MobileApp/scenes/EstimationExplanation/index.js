import React, {Component} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withStyles} from "material-ui/styles";
import {replace} from "../../../shared/actions/history";
import {Client} from "../../../shared/components";
import ClientCollection from "../../../shared/ClientCollection";
import createCountdown from "../../../shared/countdown";
import {LinearProgress} from "material-ui";

const INITIAL_GLOBAL_COUNTDOWN = 3;
const INITIAL_LOWEST_COUNTDOWN = 3;
const INITIAL_HIGHEST_COUNTDOWN = 3;

class EstimationExplanation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientWithLowestEstimationActive: false,
      clientWithHighestEstimationActive: false,
      globalCountdown: INITIAL_GLOBAL_COUNTDOWN,
      lowestCountdown: INITIAL_LOWEST_COUNTDOWN,
      highestCountdown: INITIAL_HIGHEST_COUNTDOWN
    };
  }

  render() {
    const clients = new ClientCollection(this.props.clients);
    const clientWithLowestEstimation = clients.clientWithLowestEstimation();
    const clientWithHighestEstimation = clients.clientWithHighestEstimation();

    return (
      <div>
        <LinearProgress
          variant={"determinate"}
          color={"primary"}
          value={this.state.globalCountdown * 100 / INITIAL_GLOBAL_COUNTDOWN}
        />

        {this.state.clientWithLowestEstimationActive && <Client {...clientWithLowestEstimation}/>}
        <LinearProgress
          variant={"determinate"}
          color={"primary"}
          value={this.state.lowestCountdown * 100 / INITIAL_LOWEST_COUNTDOWN}
        />


        {this.state.clientWithHighestEstimationActive && <Client {...clientWithHighestEstimation}/>}
        <LinearProgress
          variant={"determinate"}
          color={"primary"}
          value={this.state.highestCountdown * 100 / INITIAL_HIGHEST_COUNTDOWN}
        />
      </div>
    );
  }

  componentDidMount() {
    const start = createCountdown(this, "globalCountdown", 3);

    start.then(() => {
      this.setState({
        clientWithLowestEstimationActive: true
      });

      return createCountdown(this, "lowestCountdown", 3);
    }).then(() => {
      this.setState({
        clientWithLowestEstimationActive: false
      });

      return createCountdown(this, "globalCountdown", 3);
    }).then(() => {
      this.setState({
        clientWithHighestEstimationActive: true
      });

      return createCountdown(this, "highestCountdown", 5);
    }).then(() => {
      this.setState({
        clientWithHighestEstimationActive: true
      });

      setTimeout(this.props.redirectToEstimationSelection, 5000);
    });
  }
}

const mapStateToProps = state => ({
  clients: state.clients
});

const mapDispatchToProps = dispatch => ({
  redirectToEstimationSelection: () => dispatch(replace({pathname: "/estimations"}))
});

const styles = {
  estimation: {
    fontSize: "200%"
  }
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(EstimationExplanation);
