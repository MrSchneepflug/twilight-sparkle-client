import "typeface-roboto";
import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import {createBrowserHistory} from "history";

import replace from "./shared/actions/history/replace";
import {startListener} from "./shared/listener";
import {update} from "./shared/actions";
import * as SharedScenes from "./shared/scenes";
import {createRouterMiddleware} from "./shared/middleware/router";

import MobileApp from "./MobileApp";
import mobileRootReducer, {initialState as initialMobileState} from "./MobileApp/reducers"
import {createWebsocketMiddleware} from "./MobileApp/middleware/websocket";
import MobileClient from "./Websocket/MobileClient";

import TVApp from "./TVApp";
import tvRootReducer, {initialState as initialTVState} from "./TVApp/reducers";
import TVClient from "./Websocket/TVClient";

const isMobile = () => {
  return navigator.userAgent.match(
    /(iPhone|iPod|iPad|blackberry|android|Kindle|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i
  );
};

let app = null;
let store = null;
let client = null;

const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);
const websocketMiddleware = createWebsocketMiddleware(client);

if (isMobile()) {
  store = createStore(
    mobileRootReducer,
    initialMobileState,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? compose(
        applyMiddleware(routerMiddleware, websocketMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__()
      )
      : applyMiddleware(routerMiddleware, websocketMiddleware)
  );

  startListener(history, store);

  app = (
    <Provider store={store}>
      <MobileApp/>
    </Provider>
  );

  client = new MobileClient(() => {
    store.dispatch(replace({ pathname: "/teams" }));
    ReactDOM.render(app, document.getElementById('root'));
  });
} else {
  store = createStore(
    tvRootReducer,
    initialTVState,
    compose(
      applyMiddleware(routerMiddleware),
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
