import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/IssuerRegistration";
import Dashboard from "./components/Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {/* Default route */}
      <Route path="/" element={<LoginPage />} />

      {/* Register route */}
      <Route path="/register" element={<RegisterPage />} />

      {/* Dashboard (includes Add Learner inside it) */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);
