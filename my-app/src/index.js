import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
