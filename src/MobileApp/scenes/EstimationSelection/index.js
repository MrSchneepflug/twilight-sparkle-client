import React, {Component} from "react";
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from "material-ui";
import ArrowBack from "material-ui-icons/ArrowBack";
import {connect} from "react-redux";
import {selectEstimation, resetDeveloperSelection} from "../../actions";
import {goBack} from "../../../shared/actions/history";

class EstimationSelection extends Component {
  constructor(props) {
    super(props);
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
        <List>
          {this.estimationSelections()}
        </List>
        <Divider/>
        <List>
          <ListItem onClick={this.props.goBack}>
            <ListItemIcon>
              <ArrowBack/>
            </ListItemIcon>
            <ListItemText primary="Back to developer selection"/>
          </ListItem>
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  estimation: state.estimation
});

const mapDispatchToProps = dispatch => ({
  selectEstimation: estimation => dispatch(selectEstimation(estimation)),
  goBack: () => dispatch(goBack())
});

export default connect(mapStateToProps, mapDispatchToProps)(EstimationSelection);
