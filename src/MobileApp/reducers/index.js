import {combineReducers} from "redux";
import {connected, location} from "../../shared/reducers";
import developer from "./developer";
import estimation from "./estimation";
import selectedDevelopers from "./selectedDevelopers";

export default combineReducers({
  connected,
  location,
  developer,
  estimation,
  selectedDevelopers
});
