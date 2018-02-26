import React, {Component} from "react";
import {connect} from "react-redux";
import {resetDeveloperSelection, selectEstimation, reset} from "./actions/index";

class EstimationSelection extends Component {
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
          <strong onClick={() => this.props.resetDeveloperSelection(this.props.developer)}>back</strong>
        </div>

        <hr/>
        {this.estimationSelections()}
        <hr/>

        <div style={style}>
          <span onClick={this.props.reset}>RESET</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  developer: state.developer,
  estimation: state.estimation,
});

const mapDispatchToProps = dispatch => ({
  selectEstimation: estimation => dispatch(selectEstimation(estimation)),
  reset: () => dispatch(reset()),
  resetDeveloperSelection: previousDeveloper => dispatch(resetDeveloperSelection(previousDeveloper))
});

export default connect(mapStateToProps, mapDispatchToProps)(EstimationSelection);
