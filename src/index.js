import "typeface-roboto";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createBrowserHistory} from "history";

import replace from "./shared/actions/history/replace";
import {startListener} from "./shared/listener";
import Pathname from "./shared/Pathname";
import {connectToWebsocketServer, update} from "./shared/actions";
import {createRouterMiddleware} from "./shared/middleware/router";

import MobileApp from "./MobileApp";
import {createMobileStore} from "./MobileApp/store";
import {createWebsocketMiddleware} from "./MobileApp/middleware/websocket";
import MobileClient from "./Websocket/MobileClient";

import TVApp from "./TVApp";
import {createTVStore} from "./TVApp/store";
import TVClient from "./Websocket/TVClient";

const isMobile = () => {
  return navigator.userAgent.match(
    /(iPhone|iPod|iPad|blackberry|android|Kindle|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i
  );
};

let app, store, client, websocketMiddleware;

const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);

if (isMobile()) {
  client = new MobileClient(() => {
    store.dispatch(replace({pathname: "/teams"}));
    store.dispatch(connectToWebsocketServer());
  });

  websocketMiddleware = createWebsocketMiddleware(client);
  store = createMobileStore([routerMiddleware, websocketMiddleware]);

  app = <MobileApp/>;
} else {
  client = new TVClient(() => {
    store.dispatch(replace({pathname: "/dashboard"}))
    store.dispatch(connectToWebsocketServer());
  });

  store = createTVStore([routerMiddleware]);

  app = <TVApp/>;
}

client.on("update", state => {
  store.dispatch(update(state))
});

client.connect();

const pathname = new Pathname(window.location.pathname);

if (!pathname.matchesLoadingScreen()) {
  store.dispatch(replace("/"));
}

startListener(history, store);

ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));
