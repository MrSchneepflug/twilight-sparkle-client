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
import { push } from "../../../shared/actions/history";

const developersByTeam = {
  alpakka: ["PD", "TH", "BP"],
  einhorn: ["TK", "TW", "MS", "JJ"],
  irbis: ["AD", "ML", "SI", "TB"],
  kea: ["CD", "DM", "PN", "TW", "PB"],
  raccoon: ["AF", "SB", "IE"],
  tapir: ["SD", "AO", "PC", "SG"]
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
});

const mapDispatchToProps = dispatch => ({
  resetTeamSelection: () => {
    dispatch(resetTeamSelection());
    dispatch(push({ pathname: "/teams" }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperSelection);
