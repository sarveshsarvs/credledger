import React from 'react';

const CredLedgerLanding = () => {
  const styles = {
    wrapper: {
      position: 'relative',
      height: '100vh',
      margin: 0,
      fontFamily: 'Segoe UI, sans-serif',
      background: 'linear-gradient(to bottom, #0d0221, #2a0a4e)',
      color: '#cbd5f7',
      overflow: 'hidden',
    },
    header: {
      position: 'absolute',
      top: 20,
      left: 30,
      right: 30,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 2,
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#6dd5fa',
      textShadow: '0 0 8px #6dd5fa',
    },
    logoSpan: {
      color: '#ffffff',
    },
    loginBtn: {
      fontSize: '1rem',
      color: '#6dd5fa',
      background: 'none',
      border: '2px solid #6dd5fa',
      padding: '8px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background 0.3s',
    },
    loginBtnHover: {
      background: '#6dd5fa',
      color: '#0d0221',
    },
    content: {
      position: 'relative',
      zIndex: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '0 20px',
    },
    heading: {
      fontSize: '3rem',
      color: '#6dd5fa',
      textShadow: '0 0 10px #6dd5fa',
      marginBottom: '20px',
    },
    paragraph: {
      maxWidth: '600px',
      fontSize: '1rem',
      lineHeight: '1.6',
      marginBottom: '30px',
    },
    startBtn: {
      background: 'linear-gradient(to right, #6dd5fa, #8e2de2)',
      border: 'none',
      padding: '12px 28px',
      fontSize: '1rem',
      color: 'white',
      borderRadius: '30px',
      cursor: 'pointer',
      boxShadow: '0 0 12px #6dd5fa',
      transition: 'transform 0.2s ease',
    },
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <div style={styles.logo}>
          cred <span style={styles.logoSpan}>Ledger</span>
        </div>
        <button
          style={styles.loginBtn}
          onMouseEnter={(e) => {
            e.target.style.background = styles.loginBtnHover.background;
            e.target.style.color = styles.loginBtnHover.color;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'none';
            e.target.style.color = '#6dd5fa';
          }}
        >
          LOGIN
        </button>
      </header>
      <main style={styles.content}>
        <h1 style={styles.heading}>WELCOME</h1>
        <p style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation.
        </p>
        <button style={styles.startBtn}>GET STARTED</button>
      </main>
    </div>
  );
};

export default CredLedgerLanding;
