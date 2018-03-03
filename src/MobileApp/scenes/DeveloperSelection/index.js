import React, {Component} from "react";
import {connect} from "react-redux";
import Developer from "./Developer";
import {resetTeamSelection} from "../../actions";

const developersByTeam = {
  Alpakka: ["PD", "TH", "BP"],
  Einhorn: ["TK", "TW", "MS", "JJ"],
  Irbis: ["AD", "ML", "SI", "TB"],
  Kea: ["CD", "DM", "PN", "TW", "PB"],
  Raccoon: ["AF", "SB", "IE"],
  Tapir: ["SD", "AO", "PC", "SG"]
};

class DeveloperSelection extends Component {
  renderDeveloperSelections() {
    return developersByTeam[this.props.team].map(developer => {
      const isDeveloperSelected = this.props.selectedDevelopers.indexOf(developer) !== -1;
      const isSelf = developer === this.props.developer;

      return (
        <Developer
          isSelf={isSelf}
          isDeveloperSelected={isDeveloperSelected}
          name={developer}
          key={developer}
        />
      );
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
          <strong onClick={this.props.resetTeamSelection}>back</strong>
        </div>
        <hr/>
        {this.renderDeveloperSelections()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  team: state.team,
  developer: state.developer,
  selectedDevelopers: state.selectedDevelopers
});

const mapDispatchToProps = dispatch => ({
  resetTeamSelection: () => dispatch(resetTeamSelection())
});

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperSelection);
