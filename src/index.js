import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { DataProvider } from "./context/GlobalContext";
ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <DataProvider>
        <Routes>
          <Route exact path="/*" element={<App />} />
        </Routes>
      </DataProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
