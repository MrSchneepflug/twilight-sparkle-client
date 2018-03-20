import {combineReducers} from "redux";
import {location, connected} from "../../shared/reducers";
import estimation from "./estimation";
import selectedDevelopers from "./selectedDevelopers";
import {initialState as initialLocationState} from "../../shared/reducers/location"

export const initialState = {
  location: initialLocationState,
  connected: false,
  estimation: null,
  selectedDevelopers: []
};

export default combineReducers({
  location,
  connected,
  estimation,
  selectedDevelopers
});
