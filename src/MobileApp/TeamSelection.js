import React, {Component} from "react";
import {connect} from "react-redux";
import Team from "./Team";
import {selectTeam} from "./actions/index";

const teams = ["Alpakka", "Einhorn", "Irbis", "Kea", "Raccoon", "Tapir"];

class TeamSelection extends Component {
  renderTeamSelections() {
    return teams.map(team => {
      return <Team teamSelectionHandler={() => this.props.selectTeam(team)} name={team} key={team}/>
    });
  };

  render() {
    return (
      <div>
        {this.renderTeamSelections()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  selectTeam: team => dispatch(selectTeam(team))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamSelection);
