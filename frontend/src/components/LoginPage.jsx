import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function CredLedgerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('issuer');
  const [hashValue, setHashValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.boxSizing = 'border-box';
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    document.body.style.fontFamily = 'Segoe UI, sans-serif';
    document.body.style.background = `
      linear-gradient(rgba(27, 20, 63, 0.85), rgba(75, 44, 130, 0.85)),
      url('/images/bg_image.jpg') center center / cover no-repeat
    `;

    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
      @keyframes pulse {
        0% { box-shadow: 0 0 10px #00ffff; }
        50% { box-shadow: 0 0 20px #00ffff; }
        100% { box-shadow: 0 0 10px #00ffff; }
      }
    `;
    document.head.appendChild(styleSheet);
  }, []);

   const handleLogin = async (e) => {
    e.preventDefault();

    if (userType === "verifier") {
      return handleVerify();
    }

    const payload =  { email, password, role: userType };

    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    alert(res.ok ? "✅ " + data.message : "❌ " + data.message);
  };

  const handleVerify = async () => {
    if (!hashValue) {
      return alert("Please enter a hash value");
    }

    try {
      const res = await fetch(`http://localhost:3000/verify/${hashValue}`); 
      const data = await res.json();
      navigate("/verification-result", { state: data });
    } catch (err) {
      console.error(err);
      alert("❌ Error verifying credential");
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
        <h2 style={styles.title}>Cred Ledger</h2>

        <form style={styles.form}>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            style={styles.select}
            required
          >
            <option value="verifier">Verifier</option>
            <option value="issuer">Issuer</option>
          </select>

          {userType === 'verifier' ? (
            <input
              type="text"
              placeholder="Enter hash value"
              value={hashValue}
              onChange={(e) => setHashValue(e.target.value)}
              style={styles.input}
              required
            />
          ) : (
            <>
              <input
                type="email"
                placeholder="Enter your email address"
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
            </>
          )}

          <button
            onClick={handleLogin}
            style={styles.loginButton}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 0 25px #8a2be2';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = styles.loginButton.boxShadow;
            }}
          >
            {userType === 'verifier' ? 'Verify' : 'Login'}
          </button>

          {userType !== 'verifier' && (
            <div style={styles.signUpRow}>
              <span style={styles.signUpText}>Don’t have an account?</span>
              <Link to="/register" style={styles.signUpLink}>
                Sign up
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}



const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    color: '#fff',
  },
  select: { padding: "10px", borderRadius: "6px", border: "1px solid #6C4AB6", backgroundColor: "#1e1e2e", color: "#fff", fontSize: "14px", outline: "none", width: "100%", cursor: "pointer" },
  container: {
    backgroundColor: 'rgba(45, 27, 79, 0.95)',
    padding: '30px',
    borderRadius: '16px',
    width: '360px',
    boxShadow: '0 0 30px #8a2be2',
    animation: 'pulse 3s infinite',
    textAlign: 'center',
  },
  iconWrapper: { marginBottom: '10px' },
  shieldGlow: {
    display: 'inline-block',
    padding: '10px',
    borderRadius: '50%',
    backgroundColor: '#00ffff',
    boxShadow: '0 0 20px #00ffff',
    animation: 'pulse 2s infinite',
  },
  shield: { fontSize: '24px', color: '#2D1B4F' },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #00ffff, #8a2be2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '30px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #6C4AB6',
    backgroundColor: '#1e1e2e',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
  },
  loginButton: {
    padding: '12px',
    background: 'linear-gradient(90deg, #00ffff, #8a2be2)',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 0 10px #8a2be2',
    transition: 'all 0.3s ease',
    fontSize: '16px',
  },
  signUpRow: {
    marginTop: '20px',
    fontSize: '13px',
    color: '#D6C6F2',
  },
  signUpText: { marginRight: '6px' },
  signUpLink: {
    fontWeight: 'bold',
    fontSize: '13px',
    cursor: 'pointer',
    backgroundImage: 'linear-gradient(90deg, #00ffff, #8a2be2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textDecoration: 'underline',
  },
};

export default CredLedgerLogin;
