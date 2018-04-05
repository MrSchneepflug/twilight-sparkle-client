import {combineReducers} from "redux";
import {location} from "../../shared/reducers";
import clients from "./clients";
import {initialState as initialLocationState} from "../../shared/reducers/location"
import connected from "../../shared/reducers/connected";

export const initialState = {
  connected: false,
  location: initialLocationState,
  clients: []
};

export default combineReducers({
  connected,
  location,
  clients
});
