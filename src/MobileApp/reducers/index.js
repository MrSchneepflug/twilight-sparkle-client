import {combineReducers} from "redux";
import {connected, location} from "../../shared/reducers";
import estimation from "./estimation";
import selectedDevelopers from "./selectedDevelopers";
import {initialState as initialLocationState} from "../../shared/reducers/location"

export const initialState = {
  connected: false,
  location: initialLocationState,
  estimation: null,
  selectedDevelopers: []
};

export default combineReducers({
  connected,
  location,
  estimation,
  selectedDevelopers
});
