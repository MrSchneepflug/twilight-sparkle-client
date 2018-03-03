import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import mobileStore from "./MobileApp/store";
import tvStore from "./TVApp/store";
import AppShell from './AppShell/'
import TVApp from "./TVApp/components/TVApp";
import MobileApp from "./MobileApp/components/MobileApp";
import "typeface-roboto";

const isMobile = () => {
  return navigator.userAgent.match(
    /(iPhone|iPod|iPad|blackberry|android|Kindle|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i
  );
};

ReactDOM.render((
    <Provider store={isMobile() ? mobileStore : tvStore}>
      <AppShell label={isMobile() ? 'Twilight Sparkle - Mobile mode' : 'Twilight Sparkle - TV mode'}>
        {isMobile() ? <MobileApp/> : <TVApp/>}
      </AppShell>
    </Provider>
  ),
  document.getElementById('root')
);
