import {combineReducers} from "redux";
import {location} from "../../shared/reducers";
import estimation from "./estimation";
import selectedDevelopers from "./selectedDevelopers";
import {initialState as initialLocationState} from "../../shared/reducers/location"

export const initialState = {
  location: initialLocationState,
  estimation: null,
  selectedDevelopers: []
};

export default combineReducers({
  location,
  estimation,
  selectedDevelopers
});
