import React, {Component} from "react";
import {connect} from "react-redux";
import {hasResetDeveloperSelection, hasSelectedEstimation} from "./actions/index";
import {hasReset} from "../TVApp/actions/index";

class EstimationSelection extends Component {
  buildSelectionHandler(number) {
    return () => {
      this.props.hasSelectedEstimation(number)
    };
  }

  buildEstimationSelection(estimation) {
    const style = {
      textAlign: "center",
      padding: "20px"
    };

    return (
      <div key={estimation} onClick={this.buildSelectionHandler(estimation)} style={style}>
        <strong>{estimation}{estimation === this.props.selectedEstimation ? " (selected)" : ""}</strong>
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
          <strong onClick={() => this.props.hasResetDeveloperSelection(this.props.selectedDeveloper)}>back</strong>
        </div>

        <hr/>
        {this.estimationSelections()}
        <hr/>

        <div style={style}>
          <span onClick={this.props.hasReset}>RESET</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  hasSelectedEstimation: estimation => dispatch(hasSelectedEstimation(estimation)),
  hasReset: () => dispatch(hasReset()),
  hasResetDeveloperSelection: previousDeveloper => dispatch(hasResetDeveloperSelection(previousDeveloper))
});

export default connect(mapStateToProps, mapDispatchToProps)(EstimationSelection);
