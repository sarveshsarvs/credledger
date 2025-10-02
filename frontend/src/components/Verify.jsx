import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { backendAddress } from "./Meta";

function Verify() {
    const { state } = useLocation();
    const { hash } = useParams();
    const [verification, setVerification] = useState(state || null);

    useEffect(() => {
        if (!verification && hash) {
            axios.get(`${backendAddress}/api/verify/${hash}`)
                .then(res => setVerification(res.data))
                .catch(() => setVerification({ valid: false }));
        }
    }, [hash, verification]);

    if (!verification) {
        return (
            <div style={styles.wrapper}>
                <div style={styles.card}>
                    <h2>Loading verification...</h2>
                    <Link to="/" style={styles.homeBtn}>🏠 Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={verification.valid ? styles.valid : styles.invalid}>
                    {verification.valid ? "✅ Credential is VALID" : "❌ Credential is INVALID"}
                </h2>

                {verification.valid && (
                    <div style={styles.details}>
                        <p><b>Name:</b> {verification.block.credential.name}</p>
                        <p><b>Email:</b> {verification.block.credential.email}</p>
                        <p><b>Completion Date:</b> {verification.block.credential.completionDate}</p>
                        <p><b>Skill:</b> {verification.block.credential.skill}</p>
                        <p><b>Credential Hash:</b> {verification.block.credential.hash}</p>
                        <p><b>Block Hash:</b> {verification.block.hash}</p>
                    </div>
                )}

                <Link to="/" style={styles.homeBtn}>🏠 Home</Link>
            </div>
        </div>
    );
}

export default Verify;

const styles = {
    wrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        padding: "15px",
        boxSizing: "border-box",
    },
    card: {
        backgroundColor: 'rgba(45, 27, 79, 0.8)',
        padding: '20px',
        borderRadius: '16px',
        width: "100%",
        maxWidth: "700px",
        boxShadow: '0 0 20px #8a2be2',
        animation: 'pulse 3s infinite',
        textAlign: 'center',
    },
    valid: {
        color: "#00ffcc",
        wordWrap: "break-word",
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
        fontSize: "0.9rem",
        wordWrap: "break-word",
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
        fontSize: "0.95rem",
    },
};
