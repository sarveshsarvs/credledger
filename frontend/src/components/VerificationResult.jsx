import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function VerificationResult() {
  const { hash } = useParams(); // <-- read hash from URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hash) {
      fetch(`http://localhost:3000/verify/${hash}`)
        .then(res => res.json())
        .then(result => {
          setData(result);
          setLoading(false);
        })
        .catch(err => {
          console.error("Verification error:", err);
          setLoading(false);
        });
    }
  }, [hash]);

  if (loading) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h2>⏳ Verifying credential...</h2>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h2>⚠️ No verification data found.</h2>
          <Link to="/" style={styles.homeBtn}>🏠 Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={data.valid ? styles.valid : styles.invalid}>
          {data.valid ? "✅ Credential is VALID" : "❌ Credential is INVALID"}
        </h2>

        {data.valid && data.block && (
          <div style={styles.details}>
            <p><b>Name:</b> {data.block.credential.name}</p>
            <p><b>Email:</b> {data.block.credential.email}</p>
            <p><b>Completion Date:</b> {data.block.credential.completionDate}</p>
            <p><b>Skill:</b> {data.block.credential.skill}</p>
            <p><b>Credential Hash:</b> {data.block.credential.hash}</p>
            <p><b>Block Hash:</b> {data.block.hash}</p>
          </div>
        )}

        <Link to="/" style={styles.homeBtn}>🏠 Home</Link>
      </div>
    </div>
  );
}

export default VerificationResult;

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #1B143F, #2D1B4F, #4B2C82)",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "rgba(45, 27, 79, 0.95)",
    padding: "30px",
    borderRadius: "16px",
    width: "700px",
    boxShadow: "0 0 30px #8a2be2",
    animation: "pulse 3s infinite",
    textAlign: "center",
  },
  valid: {
    color: "#00ffcc",
  },
  invalid: {
    color: "#ff4444",
  },
  details: {
    marginTop: "20px",
    background: "#1e1e2e",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "left",
  },
  homeBtn: {
    marginTop: "20px",
    display: "inline-block",
    padding: "10px 20px",
    background: "linear-gradient(90deg, #00ffff, #8a2be2)",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff",
    textDecoration: "none",
    boxShadow: "0 0 12px #8a2be2",
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
  },
};
