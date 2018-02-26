import {combineReducers} from "redux";
import connected from "./connected";
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
