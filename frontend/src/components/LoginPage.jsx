import React, { useState, useEffect } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.boxSizing = 'border-box';
    document.body.style.background = 'linear-gradient(135deg, #2D1B4F, #302b63, #24243e)';
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setActiveButton('login');
    console.log('Login:', { email, password, rememberMe });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setActiveButton('register');
    console.log('Register:', { email, password });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <form style={styles.form}>
          <h2 style={styles.title}>Issuer Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <div style={styles.options}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span style={styles.optionText}>Remember me</span>
            </label>
            <button type="button" style={styles.forgot}>Forgot Password?</button>
          </div>

          <div style={styles.buttonGroup}>
            <button
              onClick={handleLogin}
              style={{
                ...styles.button,
                ...(activeButton === 'login' ? styles.activeLogin : styles.login),
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 0 25px #6C4AB6';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow =
                  activeButton === 'login'
                    ? styles.activeLogin.boxShadow
                    : styles.login.boxShadow;
              }}
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              style={{
                ...styles.button,
                ...(activeButton === 'register' ? styles.activeRegister : styles.register),
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 0 25px #BFA2DB';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow =
                  activeButton === 'register'
                    ? styles.activeRegister.boxShadow
                    : styles.register.boxShadow;
              }}
            >
              Register
            </button>
          </div>
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
    fontFamily: 'Segoe UI, sans-serif',
    color: '#fff',
  },
  container: {
    backgroundColor: 'rgba(45, 27, 79, 0.9)',
    padding: '30px',
    borderRadius: '12px',
    width: '360px',
    boxShadow: '0 0 25px rgba(191, 162, 219, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '26px',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '18px',
    borderRadius: '6px',
    border: '1px solid #6C4AB6',
    backgroundColor: '#1e1e2e',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
  },
  options: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    fontSize: '14px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  optionText: {
    color: '#D6C6F2',
  },
  forgot: {
    background: 'none',
    border: 'none',
    color: '#D6C6F2',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '14px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: '12px 0',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    margin: '0 5px',
    transition: 'all 0.3s ease',
    transform: 'scale(1)',
    fontWeight: 'bold',
    color: '#fff',
  },
  login: {
    backgroundColor: '#6C4AB6',
    boxShadow: '0 0 10px #6C4AB6',
  },
  register: {
    backgroundColor: '#BFA2DB',
    boxShadow: '0 0 10px #BFA2DB',
  },
  activeLogin: {
    backgroundColor: '#6C4AB6',
    boxShadow: '0 0 20px #6C4AB6',
  },
  activeRegister: {
    backgroundColor: '#BFA2DB',
    boxShadow: '0 0 20px #BFA2DB',
  },
};

export default LoginPage;
