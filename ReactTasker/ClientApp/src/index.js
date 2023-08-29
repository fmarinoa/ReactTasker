import React from "react";
import ReactDOM  from "react-dom/client";

import App from "./App";

//creando el root, es decir elemeto raíz donde deseamos que se renderize (pinten los componentes)
const root=ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <App/>
)