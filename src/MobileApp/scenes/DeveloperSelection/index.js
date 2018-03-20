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
import { goBack } from "../../../shared/actions/history";

const developersByTeam = {
  alpakka: ["pd", "th", "bp"],
  einhorn: ["tk", "tw", "ms", "jj"],
  irbis: ["ad", "ml", "si", "tb"],
  kea: ["cd", "dm", "pn", "tw", "pb"],
  raccoon: ["af", "sb", "ie"],
  tapir: ["sd", "ao", "pc", "sg"]
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
          <ListItem onClick={this.props.goBack}>
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
  goBack: () => dispatch(goBack())
});

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperSelection);
