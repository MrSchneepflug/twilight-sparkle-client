import {combineReducers} from "redux";
import {location} from "../../shared/reducers";
import clients from "./clients";
import connected from "../../shared/reducers/connected";

export default combineReducers({
  connected,
  location,
  clients
});
