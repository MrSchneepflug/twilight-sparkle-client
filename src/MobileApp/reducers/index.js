import {combineReducers} from "redux";
import {location, connected} from "../../shared/reducers";
import team from "./team";
import developer from "./developer";
import estimation from "./estimation";
import selectedDevelopers from "./selectedDevelopers";
import {initialState as initialLocationState} from "../../shared/reducers/location"

export const initialState = {
  location: initialLocationState,
  connected: false,
  team: null,
  developer: null,
  estimation: null,
  selectedDevelopers: []
};

export default combineReducers({
  location,
  connected,
  team,
  developer,
  estimation,
  selectedDevelopers
});
