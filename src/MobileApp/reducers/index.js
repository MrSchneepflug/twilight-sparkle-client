import {combineReducers} from "redux";
import {remove} from "lodash";

function connected(state = false, action) {
  switch (action.type) {
    case "CONNECT":
      return true;
    default:
      return state;
  }
}

function team(state = null, action) {
  switch (action.type) {
    case "SELECT_TEAM":
      return action.team;
    case "RESET_TEAM_SELECTION":
      return null;
    case "RESET":
      return null;
    default:
      return state;
  }
}

function developer(state = null, action) {
  switch (action.type) {
    case "SELECT_DEVELOPER":
      return action.developer;
    case "RESET_DEVELOPER_SELECTION":
      return null;
    case "RESET":
      return null;
    default:
      return state;
  }
}

function estimation(state = null, action) {
  switch (action.type) {
    case "SELECT_ESTIMATION":
      return action.estimation;
    case "RESET_DEVELOPER_SELECTION":
      return null;
    case "RESET":
      return null;
    default:
      return state;
  }
}

function selectedDevelopers(state = [], action) {
  switch (action.type) {
    case "UPDATE":
      return Object.keys(action.state);
    case "RESET_DEVELOPER_SELECTION":
      let selectedDevelopers = [...state];
      remove(selectedDevelopers, selectedDeveloper => selectedDeveloper === action.previousDeveloper);
      return selectedDevelopers;
      break;
    case "RESET":
      return [];
    default:
      return state;
  }
}

export default combineReducers({
  connected,
  team,
  developer,
  estimation,
  selectedDevelopers
});
