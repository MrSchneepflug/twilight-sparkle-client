import {combineReducers} from "redux";

function connected(state = false, action) {
  switch (action.type) {
    case "HAS_CONNECTED":
      return true;
    default:
      return state;
  }
}

function team(state = null, action) {
  switch (action.type) {
    case "HAS_SELECTED_TEAM":
      return action.team;
    case "HAS_RESET_TEAM_SELECTION":
      return null;
    case "HAS_RESET":
      return null;
    default:
      return state;
  }
}

function developer(state = null, action) {
  switch (action.type) {
    case "HAS_SELECTED_DEVELOPER":
      return action.developer;
    case "HAS_RESET_DEVELOPER_SELECTION":
      return null;
    case "HAS_RESET":
      return null;
    default:
      return state;
  }
}

function estimation(state = null, action) {
  switch (action.type) {
    case "HAS_SELECTED_ESTIMATION":
      return action.estimation;
    case "HAS_RESET":
      return null;
    default:
      return state;
  }
}

function selectedDevelopers(state = [], action) {
  switch (action.type) {
    case "HAS_SELECTED_DEVELOPERS":
      return action.developers;
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
