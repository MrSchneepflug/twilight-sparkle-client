import {combineReducers} from "redux";
import {connected} from "../../shared/reducers";
import estimationsByDeveloper from "./estimationsByDeveloper";

export default combineReducers({
  connected,
  estimationsByDeveloper
});
