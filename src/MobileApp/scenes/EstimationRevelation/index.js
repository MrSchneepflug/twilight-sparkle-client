import React, {Component} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withStyles} from "material-ui/styles";

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
}

const mapStateToProps = state => ({
  estimation: state.estimation
});

const mapDispatchToProps = dispatch => ({});

const styles = {
  estimation: {
    fontSize: "200%"
  }
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(EstimationRevelation);
