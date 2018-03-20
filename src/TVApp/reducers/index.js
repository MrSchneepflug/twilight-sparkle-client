import {combineReducers} from "redux";
import {location, connected} from "../../shared/reducers";
import clients from "./clients";
import {initialState as initialLocationState} from "../../shared/reducers/location"

export const initialState = {
  location: initialLocationState,
  connected: false,
  clients: []
};

export default combineReducers({
  location,
  connected,
  clients
});
