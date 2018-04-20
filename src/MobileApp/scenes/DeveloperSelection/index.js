import React, {Component} from "react";
import {Divider, List, ListItem, ListItemIcon, ListItemText} from "material-ui";
import ArrowBack from "material-ui-icons/ArrowBack";
import {connect} from "react-redux";
import Developer from "./Developer";
import {goBack} from "../../../shared/actions/history";

const developersByTeam = {
  alpakka: ["pd", "th", "bp"],
  einhorn: ["tk", "tw", "ms", "jj"],
  irbis: ["ad", "ml", "si", "tb"],
  kea: ["cd", "dm", "pn", "tw", "pb"],
  raccoon: ["af", "sb", "ie"],
  tapir: ["sd", "ao", "pc", "sg"]
};

class DeveloperSelection extends Component {
  renderDevelopers() {
    if (!this.props.team) {
      return null;
    }

    return developersByTeam[this.props.team].map(developer => (
      <Developer key={developer} name={developer}/>
    ))
  }

  render() {
    return (
      <div>
        <List>
          {this.renderDevelopers()}
        </List>
        <Divider/>
        <List>
          <ListItem onClick={this.props.goBack}>
            <ListItemIcon>
              <ArrowBack/>
            </ListItemIcon>
            <ListItemText primary="Back to team selection"/>
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
  goBack: () => dispatch(goBack())
});

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperSelection);
