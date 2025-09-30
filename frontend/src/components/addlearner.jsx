import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddLearner({ issuerEmail }) {
  const [learnerName, setLearnerName] = useState("");
  const [learnerEmail, setLearnerEmail] = useState("");
  const [skill, setSkill] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleAddLearner = async (e) => {
    e.preventDefault();
    if (!learnerName || !learnerEmail || !skill || !issueDate || !description) {
      return alert("Please fill all fields");
    }

    try {
      const res = await fetch("http://localhost:3000/api/add-learner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          issuerEmail,
          learnerName,
          learnerEmail,
          skill,
          issueDate,
          description,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Learner added successfully!\nHash: " + data.credHash);
        navigate("/dashboard");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error adding learner");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Add Learner</h2>
        <form style={styles.form} onSubmit={handleAddLearner}>
          <input
            type="text"
            placeholder="Learner Name"
            value={learnerName}
            onChange={(e) => setLearnerName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Learner Email"
            value={learnerEmail}
            onChange={(e) => setLearnerEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Skill Learned"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="date"
            placeholder="Date of Issue"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            style={styles.input}
            required
          />
          <textarea
            placeholder="Description about the skill"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...styles.input, height: "80px", resize: "none" }}
            required
          />
          <button type="submit" style={styles.loginButton}>
            Add Learner
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    color: "#fff",
  },
  container: {
    backgroundColor: "rgba(45, 27, 79, 0.95)",
    padding: "40px",
    borderRadius: "16px",
    width: "400px",
    boxShadow: "0 0 30px #8a2be2",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    background: "linear-gradient(90deg, #00ffff, #8a2be2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "30px",
  },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #6C4AB6",
    backgroundColor: "#1e1e2e",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  },
  loginButton: {
    padding: "12px",
    background: "linear-gradient(90deg, #00ffff, #8a2be2)",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    boxShadow: "0 0 10px #8a2be2",
    fontSize: "16px",
  },
};

export default AddLearner;
