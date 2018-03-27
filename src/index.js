import "typeface-roboto";
import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import {createBrowserHistory} from "history";
import {routerMiddleware} from "./shared/middleware/router";
import {startListener} from "./shared/listener";
import MobileApp from "./MobileApp";
import mobileRootReducer, {initialState as initialMobileState} from "./MobileApp/reducers"
import TVApp from "./TVApp";
import tvRootReducer, {initialState as initialTVState} from "./TVApp/reducers";
import MobileClient from "./Websocket/MobileClient";
import TVClient from "./Websocket/TVClient";
import {update} from "./shared/actions";
import * as SharedScenes from "./shared/scenes";
import replace from "./shared/actions/history/replace";

const isMobile = () => {
  return navigator.userAgent.match(
    /(iPhone|iPod|iPad|blackberry|android|Kindle|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i
  );
};

let app = null;
let store = null;
let client = null;

const history = createBrowserHistory();

if (isMobile()) {
  store = createStore(
    mobileRootReducer,
    initialMobileState,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? compose(
      applyMiddleware(
        routerMiddleware(history)
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__()
      )
      : applyMiddleware(routerMiddleware(history))
  );

  startListener(history, store);

  client = new MobileClient(() => {
    store.dispatch(replace({ pathname: "/teams" }))

    app = (
      <Provider store={store}>
        <MobileApp client={client} />
      </Provider>
    );

    ReactDOM.render(app, document.getElementById('root'));
  });
} else {
  store = createStore(
    tvRootReducer,
    initialTVState,
    compose(
      applyMiddleware(
        routerMiddleware(history)
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  startListener(history, store);

  client = new TVClient(() => {
    store.dispatch(replace({ pathname: "/dashboard" }))

    app = (
      <Provider store={store}>
        <TVApp client={client} />
      </Provider>
    );

    ReactDOM.render(app, document.getElementById('root'));
  });
}

client.on("update", state => {
  store.dispatch(update(state))
});

client.connect();

ReactDOM.render(<SharedScenes.Loading/>, document.getElementById('root'));
