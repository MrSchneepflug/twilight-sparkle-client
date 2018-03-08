import React, { Component } from "react";
import { List, Divider, ListItem, ListItemIcon, ListItemText } from "material-ui";
import ArrowBack from 'material-ui-icons/ArrowBack';
import { connect } from "react-redux";
import Developer from "./Developer";
import { resetTeamSelection } from "../../actions";

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
      const isDeveloperSelected =
        this.props.selectedDevelopers.indexOf(developer) !== -1;
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
        <List>{this.renderDeveloperSelections()}</List>
        <Divider />
        <List>
          <ListItem onClick={this.props.resetTeamSelection}>
            <ListItemIcon>
              <ArrowBack />
              </ListItemIcon>
            <ListItemText primary="Back to team selection" />
          </ListItem>
        </List>
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
