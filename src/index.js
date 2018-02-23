import React from "react";
import ReactDOM from "react-dom";
import TVApp from "./TVApp/TVApp";
import MobileApp from "./MobileApp/MobileApp";
import "typeface-roboto";

const isMobile = () => {
  return navigator.userAgent.match(
    /(iPhone|iPod|iPad|blackberry|android|Kindle|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i
  );
};

ReactDOM.render(
isMobile() ? <MobileApp /> : <TVApp />,
  document.getElementById("root")
);
