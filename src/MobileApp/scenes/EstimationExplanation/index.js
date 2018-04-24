import React, {Component} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withStyles} from "material-ui/styles";
import {replace} from "../../../shared/actions/history";
import {Countdown, Client} from "../../../shared/components";
import ClientCollection from "../../../shared/ClientCollection";

class EstimationExplanation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientWithLowestEstimationActive: true,
      clientWithHighestEstimationActive: false
    };
  }

  render() {
    const clients = new ClientCollection(this.props.clients);
    const clientWithLowestEstimation = clients.clientWithLowestEstimation();
    const clientWithHighestEstimation = clients.clientWithHighestEstimation();

    return (
      <div>
        {this.state.clientWithLowestEstimationActive && <Client {...clientWithLowestEstimation}/>}
        <Countdown
          initialValue={5}
          active
          onFinish={() => {
            this.setState({
              clientWithLowestEstimationActive: false,
              clientWithHighestEstimationActive: true
            })
          }}
        />

        {this.state.clientWithHighestEstimationActive && <Client {...clientWithHighestEstimation}/>}
        <Countdown
          initialValue={5}
          active={this.state.clientWithHighestEstimationActive}
          onFinish={() => {
            this.setState({
              clientWithLowestEstimationActive: false,
              clientWithHighestEstimationActive: false
            })
          }}
        />

        <Countdown
          initialValue={5}
          active={!this.state.clientWithLowestEstimationActive && !this.state.clientWithHighestEstimationActive}
          onFinish={this.props.redirectToEstimationSelection}
        />
      </div>
    );
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
