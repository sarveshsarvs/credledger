import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import IssuerRegistration from "./components/IssuerRegistration";
import Dashboard from "./components/Dashboard"; // ✅ added
import VerificationResult from "./components/VerificationResult";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<IssuerRegistration />} />
      <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ added */}
      <Route path="/verification-result" element={<VerificationResult />} />
    </Routes>
  </BrowserRouter>
);
