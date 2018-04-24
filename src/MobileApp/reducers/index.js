import {combineReducers} from "redux";
import {connected, location} from "../../shared/reducers";
import team from "./team";
import developer from "./developer";
import estimation from "./estimation";
import clients from "./clients";

export default combineReducers({
  connected,
  location,
  team,
  developer,
  estimation,
  clients
});
