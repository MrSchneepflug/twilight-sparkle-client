import React, {Component} from "react";
import {connect} from "react-redux";
import {resetDeveloperSelection, selectEstimation} from "../../actions";
import { goBack } from "../../../shared/actions/history";

class EstimationSelection extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.resetDeveloperSelection(this.props.pathname, this.props.developer);
  }

  buildSelectionHandler(number) {
    return () => {
      this.props.selectEstimation(number)
    };
  }

  buildEstimationSelection(estimation) {
    const style = {
      textAlign: "center",
      padding: "20px"
    };

    return (
      <div key={estimation} onClick={this.buildSelectionHandler(estimation)} style={style}>
        <strong>{estimation}{estimation === this.props.estimation ? " (selected)" : ""}</strong>
      </div>
    );
  }

  estimationSelections() {
    return [1, 2, 3, 5, 8, 13, 20].map(estimation => {
      return this.buildEstimationSelection(estimation);
    });
  }

  render() {
    const style = {
      textAlign: "center",
      padding: "20px"
    };

    return (
      <div>
        <div style={style}>
          <strong onClick={this.clickHandler}>back</strong>
        </div>

        <hr/>

        {this.estimationSelections()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.location.pathname,
  developer: state.developer,
  estimation: state.estimation
});

const mapDispatchToProps = dispatch => ({
  selectEstimation: estimation => dispatch(selectEstimation(estimation)),
  resetDeveloperSelection: (pathname, previousDeveloper) => {
    dispatch(resetDeveloperSelection(previousDeveloper));
    dispatch(goBack());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EstimationSelection);
