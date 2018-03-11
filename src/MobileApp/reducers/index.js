import {combineReducers} from "redux";
import {location, connected} from "../../shared/reducers";
import team from "./team";
import developer from "./developer";
import estimation from "./estimation";
import selectedDevelopers from "./selectedDevelopers";

export default combineReducers({
  location,
  connected,
  team,
  developer,
  estimation,
  selectedDevelopers
});
