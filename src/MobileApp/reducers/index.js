import {combineReducers} from "redux";
import {connected, location} from "../../shared/reducers";
import developer from "./developer";
import estimation from "./estimation";
import selectedDevelopers from "./selectedDevelopers";
import {initialState as initialLocationState} from "../../shared/reducers/location"

export const initialState = {
  connected: false,
  location: initialLocationState,
  developer: null,
  estimation: null,
  selectedDevelopers: []
};

export default combineReducers({
  connected,
  location,
  developer,
  estimation,
  selectedDevelopers
});
