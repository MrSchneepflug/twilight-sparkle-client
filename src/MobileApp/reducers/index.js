import {combineReducers} from "redux";
import {connected} from "../../shared/reducers";
import team from "./team";
import developer from "./developer";
import estimation from "./estimation";
import selectedDevelopers from "./selectedDevelopers";

export default combineReducers({
  connected,
  team,
  developer,
  estimation,
  selectedDevelopers
});
