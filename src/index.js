import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import configureMobileStore from "./MobileApp/store";
import configureTVStore from "./TVApp/store";
import AppShell from './AppShell/'
import TVApp from "./TVApp/TVApp";
import MobileApp from "./MobileApp/MobileApp";
import "typeface-roboto";

const isMobile = () => {
  return navigator.userAgent.match(
    /(iPhone|iPod|iPad|blackberry|android|Kindle|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i
  );
};

const mobileStore = configureMobileStore({
  connected: false,
  team: null,
  developer: null,
  estimation: null,
  selectedDevelopers: []
});

const tvStore = configureTVStore({
  connected: false,
  estimationsByDeveloper: {}
});

ReactDOM.render((
    <Provider store={window.device === "mobile" ? mobileStore : tvStore}>
      <AppShell label={isMobile() ? 'Twilight Sparkle - Mobile mode' : 'Twilight Sparkle - TV mode'}>
        {isMobile() ? <MobileApp /> : <TVApp />}
      </AppShell>
    </Provider>
  ),
  document.getElementById('root')
);
