import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ModalProvider } from "./context/ModalContext";
import { ThemeProvider } from "./context/ThemeContext";
import { TasksProvider } from "./context/TasksContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TasksProvider>
      <ThemeProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ThemeProvider>
    </TasksProvider>
  </React.StrictMode>
);
