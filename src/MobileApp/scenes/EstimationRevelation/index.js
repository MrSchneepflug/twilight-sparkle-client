import React, {Component} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withStyles} from "material-ui/styles";
import {replace} from "../../../shared/actions/history";
import {Countdown} from "../../../shared/components";
import ClientCollection from "../../../shared/ClientCollection";

class EstimationRevelation extends Component {
  render() {
    const clients = new ClientCollection(this.props.clients);

    return (
      <div>
        <strong className={this.props.classes.estimation}>
          {this.props.estimation}
        </strong>

        <Countdown
          initialValue={5}
          active
          onFinish={
            clients.haveEstimatedCloseEnough()
              ? this.props.redirectToEstimationSelection
              : this.props.redirectToEstimationExplanation
          }
        />
      </div>
    );
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
