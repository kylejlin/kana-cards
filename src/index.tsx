import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CardsAgainstIlliteracy from "./CardsAgainstIlliteracy";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <CardsAgainstIlliteracy />
  </React.StrictMode>,
  document.getElementById("root"),
);

serviceWorker.register();
