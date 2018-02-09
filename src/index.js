import React from "react";
import ReactDOM from "react-dom";
import TVApp from "./TVApp/TVApp";
import MobileApp from "./MobileApp/MobileApp";
import "typeface-roboto";

ReactDOM.render(
  window.device === "mobile"
    ? <MobileApp/>
    : <TVApp/>,
  document.getElementById('root')
);
