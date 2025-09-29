import React from "react";
import { useLocation, Link } from "react-router-dom";

function VerificationResult() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div>
        <h2>No verification data found.</h2>
        <Link to="/">Go Back</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <h2>{state.valid ? "✅ Credential is VALID" : "❌ Credential is INVALID"}</h2>

      {state.valid && (
        <div style={{ marginTop: "20px", background: "#1e1e2e", padding: "15px", borderRadius: "8px" }}>
          <p><b>Learner:</b> {state.block.credential.learner}</p>
          <p><b>Title:</b> {state.block.credential.title}</p>
          <p><b>Credential Hash:</b> {state.block.credential.hash}</p>
          <p><b>Block Hash:</b> {state.block.hash}</p>
        </div>
      )}

      <Link to="/" style={{ display: "block", marginTop: "20px", color: "#00ffff" }}>
        🔙 Back
      </Link>
    </div>
  );
}

export default VerificationResult;
