import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import IssuerRegistration from "./components/IssuerRegistration";
import Dashboard from "./components/Dashboard";
import VerificationResult from "./components/VerificationResult";
import AddLearner from "./components/addlearner"; // ✅ new import

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<IssuerRegistration />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-learner" element={<AddLearner />} /> {/* ✅ new route */}
      <Route path="/verification-result" element={<VerificationResult />} />
    </Routes>
  </BrowserRouter>
);
