import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import routePaths from "./routePaths";
import Dashboard from "./modules/Dashboard";
import Errors from "./modules/Errors";
import { Offline } from "./components";
import "./App.css";

function App() {
  return (
    <div>
      <Offline />
      <React.Suspense fallback={<h1>Loading profile...</h1>}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={routePaths.dashboard.route} exact />}
          />
          <Route
            exact
            path={routePaths.dashboard.route}
            element={<Dashboard />}
          />
          {/* NOTE: create 404 not found page for mismatched routes */}
          <Route
            exact
            path={routePaths.notFoundPage.route}
            element={<Errors codeProp="404" />}
          />
          <Route
            exact
            path={routePaths.serverErrorPage.route}
            element={<Errors codeProp="500" />}
          />
          <Route exact path="*" element={<Errors codeProp="404" />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
