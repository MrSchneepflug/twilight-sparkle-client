import {applyMiddleware, compose, createStore} from "redux";
import tvRootReducer from "./reducers";
import {initialState as initialLocationState} from "../shared/reducers/location";

export const initialState = {
  connected: false,
  location: initialLocationState,
  clients: []
};

export function createTVStore(middlewares) {
  return createStore(
    tvRootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}
