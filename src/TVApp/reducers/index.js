import {combineReducers} from "redux";
import {connected} from "../../shared/reducers";
import clients from "./clients";

export default combineReducers({
  connected,
  clients
});
