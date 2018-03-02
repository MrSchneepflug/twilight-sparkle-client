import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers";

const initialState = {
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
