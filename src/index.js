import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import configureMobileStore from "./MobileApp/store";
import configureTVStore from "./TVApp/store";
import TVApp from "./TVApp/components/TVApp";
import MobileApp from "./MobileApp/components/MobileApp";
import "typeface-roboto";

const mobileStore = configureMobileStore({
  connected: false,
  team: null,
  developer: null,
  estimation: null,
  selectedDevelopers: []
});

const tvStore = configureTVStore({
  connected: false,
  clients: []
});

ReactDOM.render((
    <Provider store={window.device === "mobile" ? mobileStore : tvStore}>
      {window.device === "mobile" ? <MobileApp/> : <TVApp/>}
    </Provider>
  ),
  document.getElementById('root')
);
