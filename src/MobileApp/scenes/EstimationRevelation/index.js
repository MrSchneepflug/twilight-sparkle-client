import React, {Component} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withStyles} from "material-ui/styles";
import {replace} from "../../../shared/actions/history";

class EstimationRevelation extends Component {
  render() {
    return (
      <div>
        <strong className={this.props.classes.estimation}>
          {this.props.estimation}
        </strong>
      </div>
    );
  }

  componentDidMount() {
    setTimeout(this.props.redirectToEstimationSelection, 5000);
  }
}

const mapStateToProps = state => ({
  estimation: state.estimation
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
)(EstimationRevelation);
