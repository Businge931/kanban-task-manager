import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { BrowserRouter } from "react-router-dom";
import ModalContext from "./context/ModalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ModalContext>
      {/* <BrowserRouter> */}
      <App />
      {/* </BrowserRouter> */}
    </ModalContext>
  </React.StrictMode>
);
