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

const isMobile = () => {
  return navigator.userAgent.match(
    /(iPhone|iPod|iPad|blackberry|android|Kindle|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i
  );
};

ReactDOM.render((
    <Provider store={isMobile() ? mobileStore : tvStore}>
      {isMobile() ? <MobileApp/> : <TVApp/>}
    </Provider>
  ),
  document.getElementById('root')
);
