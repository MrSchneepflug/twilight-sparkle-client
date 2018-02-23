import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import configureStore from "./TVApp/store";
import TVApp from "./TVApp/TVApp";
import MobileApp from "./MobileApp/MobileApp";
import "typeface-roboto";

let rootComponent = null;
const tvStore = configureStore({
  connected: false,
  estimationsByDeveloper: {}
});

if (window.device === "mobile") {
  rootComponent = <MobileApp/>;
} else {
  rootComponent = (
    <Provider store={tvStore}>
      <TVApp/>
    </Provider>
  );
}

ReactDOM.render(rootComponent, document.getElementById('root'));
