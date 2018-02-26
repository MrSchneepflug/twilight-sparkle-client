import {combineReducers} from "redux";

function connected(state = false, action) {
  switch (action.type) {
    case "CONNECT":
      return true;
    default:
      return state;
  }
}

function estimationsByDeveloper(state = {}, action) {
  switch (action.type) {
    case "UPDATE":
      return action.state;
    case "RESET":
      return {};
    default:
      return state;
  }
}

export default combineReducers({
  connected,
  estimationsByDeveloper
});
