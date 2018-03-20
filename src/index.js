import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import {createBrowserHistory} from "history";
import "typeface-roboto";
import {routerMiddleware} from "./shared/middleware/router";
import {startListener} from "./shared/listener";
import MobileApp from "./MobileApp/";
import mobileRootReducer, {initialState as initialMobileState} from "./MobileApp/reducers"
import TVApp from "./TVApp/components/TVApp";
import tvStore from "./TVApp/store";

const isMobile = () => {
  return navigator.userAgent.match(
    /(iPhone|iPod|iPad|blackberry|android|Kindle|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i
  );
};

let app = null;

if (isMobile()) {
  const history = createBrowserHistory();
  const store = createStore(
    mobileRootReducer,
    initialMobileState,
    compose(
      applyMiddleware(
        routerMiddleware(history)
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  startListener(history, store);

  app = (
    <Provider store={store}>
      <MobileApp/>
    </Provider>
  );
} else {
  app = (
    <Provider store={tvStore}>
      <TVApp/>
    </Provider>
  );
}

ReactDOM.render(app, document.getElementById('root'));
