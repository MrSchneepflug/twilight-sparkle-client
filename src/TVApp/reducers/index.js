import {combineReducers} from "redux";

function connected(state = false, action) {
  switch (action.type) {
    case "HAS_CONNECTED":
      return true;
    default:
      return state;
  }
}

function estimationsByDeveloper(state = {}, action) {
  switch (action.type) {
    case "HAS_UPDATED":
      return action.state;
    case "HAS_RESET":
      return {};
    default:
      return state;
  }
}

export default combineReducers({
  connected,
  estimationsByDeveloper
});
