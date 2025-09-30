import React, { useState, useEffect } from "react";
import { UserPlus, Users, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [view, setView] = useState("profile");
  const [learners, setLearners] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    completionDate: "",
    skill: "",
    skillDescription: "",
  });
  const [hovered, setHovered] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [issuer, setIssuer] = useState(null);

  const issuerEmail = state ? state.issuerEmail : null

  useEffect(() => {
    if (!issuerEmail) return;

    if (view === "view") {
      fetch(`http://localhost:3000/api/learners?issuerEmail=${issuerEmail}`)
        .then((res) => res.json())
        .then((data) => setLearners(data))
        .catch((err) => console.error("Error loading learners:", err));
    }

    if (view === "profile") {
      fetch("http://localhost:3000/api/issuers")
        .then((res) => res.json())
        .then((data) => {
        const foundIssuer = data.find((i) => i.email === issuerEmail);
        setIssuer(foundIssuer || null);
        })
        .catch((err) => console.error("Error loading issuer profile:", err));
    }

  }, [view, issuerEmail]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddLearner = async () => {
    const { name, email, phone, completionDate, skill, skillDescription } = form;

    if (!name || !email || !phone || !completionDate || !skill || !skillDescription) {
      alert("Please fill all fields");
      return;
    }

    if (!issuerEmail) {
      alert("Issuer email missing. Please login again.");
      return;
    }

    try {
        console.log(JSON.stringify({ ...form }))
      const res = await fetch("http://localhost:3000/api/add-learner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, issuerEmail }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Learner added successfully");
        // Clear form
        setForm({
          name: "",
          email: "",
          phone: "",
          completionDate: "",
          skill: "",
          skillDescription: "",
        });
        // Update learners list locally
        setLearners((prev) => [...prev, data.learner]);
        setView("view"); // Switch to view tab to see new learner
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
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <button
          style={{
            ...styles.sidebarBtn,
            ...(hovered === "profileBtn" ? styles.sidebarBtnHover : {}),
          }}
          onMouseEnter={() => setHovered("profileBtn")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setView("profile")}
        >
          <User style={{ marginRight: 8 }} /> Profile
        </button>

        <button
          style={{
            ...styles.sidebarBtn,
            ...(hovered === "addBtn" ? styles.sidebarBtnHover : {}),
          }}
          onMouseEnter={() => setHovered("addBtn")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setView("add")}
        >
          <UserPlus style={{ marginRight: 8 }} /> Add Learner
        </button>

        <button
          style={{
            ...styles.sidebarBtn,
            ...(hovered === "viewBtn" ? styles.sidebarBtnHover : {}),
          }}
          onMouseEnter={() => setHovered("viewBtn")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setView("view")}
        >
          <Users style={{ marginRight: 8 }} /> View Learners
        </button>

        {/* Logout button at bottom */}
        <button
          style={{
            ...styles.logoutBtn,
            ...(hovered === "logoutBtn" ? styles.logoutBtnHover : {}),
            marginTop: "auto", // Push to bottom
          }}
          onMouseEnter={() => setHovered("logoutBtn")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate("/")} // Navigate to login
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {view === "profile" && (
            <div style={styles.profile}>
                <h1>Profile</h1>
                <hr />
                {issuer ? (
                <>
                    <p><strong>Name:</strong> {issuer.name}</p>
                    <p><strong>Email:</strong> {issuer.email}</p>
                    <p><strong>Institution:</strong> {issuer.institution}</p>
                    <p><strong>Role:</strong> {issuer.role}</p>
                    <p><strong>Total Learners:</strong> {issuer.learners.length}</p>
                </>
                ) : (
                <p>Loading profile...</p>
                )}
            </div>
        )}


        {view === "add" && (
          <div style={styles.section}>
            <h2>Add New Learner</h2>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="tel"
              placeholder="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="date"
              name="completionDate"
              value={form.completionDate}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Skill"
              name="skill"
              value={form.skill}
              onChange={handleChange}
              style={styles.input}
            />
            <textarea
              placeholder="Skill Description"
              name="skillDescription"
              value={form.skillDescription}
              onChange={handleChange}
              style={{ ...styles.input, height: "80px" }}
            />

            <button
              style={{
                ...styles.addBtn,
                ...(hovered === "saveBtn" ? styles.addBtnHover : {}),
              }}
              onMouseEnter={() => setHovered("saveBtn")}
              onMouseLeave={() => setHovered(null)}
              onClick={handleAddLearner}
            >
              Save Learner
            </button>
          </div>
        )}

        {view === "view" && (
          <div style={styles.section}>
            <h2>All Learners</h2>
            {learners.length === 0 ? (
              <p>No learners yet</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Credential hash</th>
                  </tr>
                </thead>
                <tbody>
                  {learners.map((l, i) => (
                    <tr key={i}>
                      <td style={styles.td}>{l.name}</td>
                      <td style={styles.td}>{l.email}</td>
                      <td style={styles.td}>{l.hash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    background: "linear-gradient(135deg, #1B143F, #2D1B4F, #4B2C82)",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "250px",
    background: "rgba(20, 10, 50, 0.95)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "2px 0 10px rgba(0,0,0,0.4)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
    gap: "10px",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "bold",
    background: "linear-gradient(90deg, #00ffff, #8a2be2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  sidebarBtn: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    background: "linear-gradient(90deg, #00ffff, #8a2be2)",
    color: "#fff",
    boxShadow: "0 0 10px rgba(138,43,226,0.35)",
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    background: "linear-gradient(90deg, #ff0000ff, #e2502bff)",
    color: "#fff",
    boxShadow: "0 0 10px rgba(138,43,226,0.35)",
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
  },
  sidebarBtnHover: {
    transform: "scale(1.06)",
    boxShadow: "0 6px 30px rgba(0, 255, 255, 0.29), 0 0 40px rgba(138,43,226,0.35)",
  },
  logoutBtnHover: {
    transform: "scale(1.06)",
    boxShadow: "0 6px 30px rgba(255, 8, 0, 0.27), 0 0 40px rgba(138,43,226,0.35)",
  },
  content: {
    flex: 1,
    padding: "30px",
    overflowY: "auto",
  },
  section: {
    background: "rgba(255,255,255,0.03)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profile: {
    display: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    background: "rgba(255,255,255,0.03)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
  },
  input: {
    width: "80%",
    padding: "8px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #6C4AB6",
    backgroundColor: "#1e1e2e",
    color: "#fff",
    outline: "none",
  },
  addBtn: {
    marginTop: "10px",
    padding: "10px",
    width: "80%",
    background: "linear-gradient(90deg, #00ffff, #8a2be2)",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff",
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
  },
  addBtnHover: {
    transform: "scale(1.04)",
    boxShadow:
      "0 8px 36px rgba(0,255,255,0.12), 0 0 40px rgba(138,43,226,0.28)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
  },
  th: {
    borderBottom: "1px solid #666",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    borderBottom: "1px solid #333",
    padding: "10px",
  },
};
