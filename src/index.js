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
import {selectEstimation} from "./MobileApp/actions";
import {createWebsocketMiddleware as createMobileWebsocketMiddleware} from "./MobileApp/middleware/websocket";
import MobileClient from "./Websocket/MobileClient";
import {startListener as startMobileListener} from "./MobileApp/listener";

import TVApp from "./TVApp";
import {createTVStore} from "./TVApp/store";
import {createWebsocketMiddleware as createTVWebsocketMiddleware} from "./TVApp/middleware/websocket";
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
  client = new MobileClient();
  client.on("open", () => {
    store.dispatch(replace({pathname: "/teams"}));
    store.dispatch(connectToWebsocketServer());
  });
  client.on("resetEstimation", () => {
    store.dispatch(selectEstimation(null, false));
  });
  client.on("revealEstimation", () => {
    store.dispatch(replace({pathname: "/estimation"}));
  });

  websocketMiddleware = createMobileWebsocketMiddleware(client);
  store = createMobileStore([routerMiddleware, websocketMiddleware]);
  startMobileListener(history, store);

  app = <MobileApp/>;
} else {
  client = new TVClient();
  client.on("open", () => {
    store.dispatch(replace({pathname: "/dashboard"}));
    store.dispatch(connectToWebsocketServer());
  });

  websocketMiddleware = createTVWebsocketMiddleware(client);
  store = createTVStore([routerMiddleware, websocketMiddleware]);

  app = <TVApp/>;
}

const pathname = new Pathname(window.location.pathname);

if (!pathname.matchesLoadingScreen()) {
  store.dispatch(replace("/"));
}

startListener(history, store);

ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));

client.on("update", state => store.dispatch(update(state)));
client.connect();
