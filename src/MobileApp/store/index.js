import {createStore} from "redux";
import rootReducer from "../reducers";
import {initialState as initialLocationState} from "../reducers/location";

const initialState = {
  location: initialLocationState,
  connected: false,
  team: null,
  developer: null,
  estimation: null,
  selectedDevelopers: []
};

export default createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
