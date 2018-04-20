import {combineReducers} from "redux";
import {connected, location} from "../../shared/reducers";
import team from "./team";
import developer from "./developer";
import estimation from "./estimation";
import selectedDevelopers from "./selectedDevelopers";

export default combineReducers({
  connected,
  location,
  team,
  developer,
  estimation,
  selectedDevelopers
});
