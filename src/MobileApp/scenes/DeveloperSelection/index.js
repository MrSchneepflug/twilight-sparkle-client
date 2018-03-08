import React, { Component } from "react";
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from "material-ui";
import ArrowBack from "material-ui-icons/ArrowBack";
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
  render() {
    return (
      <div>
        <List>
          {developersByTeam[this.props.team].map(developer => (
            <Developer key={developer} name={developer} />
          ))}
        </List>
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
  team: state.team
});

const mapDispatchToProps = dispatch => ({
  resetTeamSelection: () => dispatch(resetTeamSelection())
});

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperSelection);