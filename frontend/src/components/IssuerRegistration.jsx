// src/components/RegisterPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("issuer"); // default issuer
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.boxSizing = "border-box";
    document.body.style.background = "linear-gradient(135deg, #1B143F 0%, #2D1B4F 40%, #4B2C82 100%)";
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
    document.body.style.fontFamily = "Segoe UI, sans-serif";

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes pulse {
        0% { box-shadow: 0 0 10px #00ffff; }
        50% { box-shadow: 0 0 20px #00ffff; }
        100% { box-shadow: 0 0 10px #00ffff; }
      }
    `;
    document.head.appendChild(styleSheet);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: userType }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ " + data.message);
        navigate("/login");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error during signup");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.iconWrapper}>
          <div style={styles.shieldGlow}>
            <span style={styles.shield}>🛡️</span>
          </div>
        </div>
        <h2 style={styles.title}>Register</h2>

        <form style={styles.form}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button
            onClick={handleRegister}
            style={styles.loginButton}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 0 25px #8a2be2";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = styles.loginButton.boxShadow;
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "#fff" },
  container: { backgroundColor: "rgba(45, 27, 79, 0.95)", padding: "40px", borderRadius: "16px", width: "360px", boxShadow: "0 0 30px #8a2be2", animation: "pulse 3s infinite", textAlign: "center" },
  iconWrapper: { marginBottom: "10px" },
  shieldGlow: { display: "inline-block", padding: "10px", borderRadius: "50%", backgroundColor: "#00ffff", boxShadow: "0 0 20px #00ffff", animation: "pulse 2s infinite" },
  shield: { fontSize: "24px", color: "#2D1B4F" },
  title: { fontSize: "24px", fontWeight: "bold", background: "linear-gradient(90deg, #00ffff, #8a2be2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "30px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "10px", borderRadius: "6px", border: "1px solid #6C4AB6", backgroundColor: "#1e1e2e", color: "#fff", fontSize: "14px", outline: "none", transition: "box-shadow 0.3s ease, border-color 0.3s ease" },
  loginButton: { padding: "12px", background: "linear-gradient(90deg, #00ffff, #8a2be2)", color: "#fff", fontWeight: "bold", border: "none", borderRadius: "6px", cursor: "pointer", boxShadow: "0 0 10px #8a2be2", transition: "all 0.3s ease", fontSize: "16px" },
};

export default RegisterPage;
