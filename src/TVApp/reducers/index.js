import {combineReducers} from "redux";
import connected from "./connected";
import estimationsByDeveloper from "./estimationsByDeveloper";

export default combineReducers({
  connected,
  estimationsByDeveloper
});
