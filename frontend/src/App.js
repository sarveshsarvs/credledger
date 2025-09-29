import React, { useState, useEffect } from 'react';

function BlockchainPortalLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.boxSizing = 'border-box';
    document.body.style.background = 'linear-gradient(135deg, #2D1B4F, #302B63, #24243E)';
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    document.body.style.fontFamily = 'Segoe UI, sans-serif';

    // Inject keyframes for pulse animation
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
      @keyframes pulse {
        0% { box-shadow: 0 0 10px #00ffff; }
        50% { box-shadow: 0 0 25px #00ffff; }
        100% { box-shadow: 0 0 10px #00ffff; }
      }
    `;
    document.head.appendChild(styleSheet);
  }, []);

  const handleConnect = (e) => {
    e.preventDefault();
    console.log('Connect to Network:', { email, password });
  };

  const handleRegister = () => {
    console.log('Register Node');
  };

  const handleRecover = () => {
    console.log('Recover Access Key');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.iconWrapper}>
          <div style={styles.shieldGlow}>
            <span style={styles.shield}>🛡</span>
          </div>
        </div>
        <h2 style={styles.title}>Blockchain Portal</h2>
        <p style={styles.subtitle}>Secure access to the decentralized network</p>

        <form style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button
            onClick={handleConnect}
            style={styles.connectButton}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 0 25px #00ffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = styles.connectButton.boxShadow;
            }}
          >
            Connect to Network
          </button>

          <div style={styles.registerSection}>
            <span style={styles.registerText}>New to the network?</span>
            <button onClick={handleRegister} style={styles.registerButton}>
              Register Node
            </button>
          </div>

          <button onClick={handleRecover} style={styles.recoverLink}>
            🗝 Recover Access Key?
          </button>
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
  container: {
    backgroundColor: 'rgba(45, 27, 79, 0.95)',
    padding: '40px',
    borderRadius: '16px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 0 30px rgba(191, 162, 219, 0.3)',
    textAlign: 'center',
  },
  iconWrapper: {
    marginBottom: '10px',
  },
  shieldGlow: {
    display: 'inline-block',
    padding: '10px',
    borderRadius: '50%',
    backgroundColor: '#00ffff',
    boxShadow: '0 0 20px #00ffff',
    animation: 'pulse 2s infinite',
  },
  shield: {
    fontSize: '24px',
    color: '#2D1B4F',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #00ffff, #8a2be2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#D6C6F2',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    textAlign: 'left',
    fontSize: '14px',
    color: '#D6C6F2',
  },
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
  connectButton: {
    padding: '12px',
    backgroundColor: '#00ffff',
    color: '#2D1B4F',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 0 10px #00ffff',
    transition: 'all 0.3s ease',
  },
  registerSection: {
    marginTop: '10px',
  },
  registerText: {
    fontSize: '12px',
    color: '#D6C6F2',
  },
  registerButton: {
    marginTop: '6px',
    padding: '10px',
    backgroundColor: '#BFA2DB',
    color: '#2D1B4F',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 0 10px #BFA2DB',
    transition: 'all 0.3s ease',
  },
  recoverLink: {
    marginTop: '20px',
    background: 'none',
    border: 'none',
    color: '#D6C6F2',
    fontSize: '13px',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default BlockchainPortalLogin;