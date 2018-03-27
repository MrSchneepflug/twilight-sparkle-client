import {combineReducers} from "redux";
import {location} from "../../shared/reducers";
import clients from "./clients";
import {initialState as initialLocationState} from "../../shared/reducers/location"

export const initialState = {
  location: initialLocationState,
  clients: []
};

export default combineReducers({
  location,
  clients
});
