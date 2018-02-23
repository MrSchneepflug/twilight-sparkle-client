import React, {Component} from "react";
import {connect} from "react-redux";
import Team from "./Team";
import {hasSelectedTeam} from "./actions/index";

const teams = ["Alpakka", "Einhorn", "Irbis", "Kea", "Raccoon", "Tapir"];

class TeamSelection extends Component {
  renderTeamSelections() {
    return teams.map(team => {
      return <Team teamSelectionHandler={() => this.props.hasSelectedTeam(team)} name={team} key={team}/>
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
  hasSelectedTeam: team => dispatch(hasSelectedTeam(team))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamSelection);
