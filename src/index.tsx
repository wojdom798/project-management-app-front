import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./Main";

import "./styles/styles_main.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<Main />);