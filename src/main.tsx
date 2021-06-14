import { Provider } from "jotai";
import { render } from "react-dom";
import React from "react";
import { Desk } from "./components/Desk";
import { MainMenu } from "./views/mainMenu/MainMenu";
import socketIOClient from "socket.io-client";

import "./css/global.scss";

render(
  <Provider>
    <MainMenu />
  </Provider>,
  document.getElementById("root")!,
);
