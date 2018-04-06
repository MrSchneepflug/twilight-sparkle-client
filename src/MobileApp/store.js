import {applyMiddleware, compose, createStore} from "redux";
import mobileRootReducer from "./reducers"
import {initialState as initialLocationState} from "../shared/reducers/location"

export const initialState = {
  connected: false,
  location: initialLocationState,
  developer: null,
  estimation: null,
  selectedDevelopers: []
};

export function createMobileStore(middlewares) {
  return createStore(
    mobileRootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__()
      )
      : applyMiddleware(...middlewares)
  );
}
