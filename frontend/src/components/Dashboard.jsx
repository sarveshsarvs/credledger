import React, { useState } from "react";
import { UserPlus, Users, GraduationCap } from "lucide-react";

/**
 * Dashboard with sidebar and hover glow + size increase on buttons.
 * - Hover state is tracked with `hovered`.
 * - Buttons merge base style + hover style when hovered.
 */

const initialLearners = [
  { name: "Alice", id: "101", phone: "9998887777", completionDate: "2025-09-10" },
  { name: "Bob", id: "102", phone: "8887776666", completionDate: "2025-09-15" },
];

const Dashboard = () => {
  const [view, setView] = useState("home");
  const [learners, setLearners] = useState(initialLearners);
  const [form, setForm] = useState({ name: "", id: "", phone: "", completionDate: "" });
  const [hovered, setHovered] = useState(null); // <-- fix: hover state

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddLearner = () => {
    if (!form.name || !form.id || !form.phone || !form.completionDate) {
      alert("Fill all fields");
      return;
    }
    setLearners((prev) => [...prev, form]);
    setForm({ name: "", id: "", phone: "", completionDate: "" });
    alert("Learner added successfully!");
  };

  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <GraduationCap size={32} color="#00ffff" />
          <h2 style={styles.logoText}>Learner Hub</h2>
        </div>

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
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {view === "home" && (
          <div style={styles.section}>
            <h1>Welcome to Learner Hub</h1>
            <p>Select an option from the sidebar</p>
          </div>
        )}

        {view === "add" && (
          <div style={styles.section}>
            <h2>Add New Learner</h2>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="ID"
              name="id"
              value={form.id}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
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
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Phone</th>
                    <th style={styles.th}>Completion Date</th>
                  </tr>
                </thead>
                <tbody>
                  {learners.map((l, i) => (
                    <tr key={i}>
                      <td style={styles.td}>{l.name}</td>
                      <td style={styles.td}>{l.id}</td>
                      <td style={styles.td}>{l.phone}</td>
                      <td style={styles.td}>{l.completionDate}</td>
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

/* Styles */
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
  sidebarBtnHover: {
    transform: "scale(1.06)",
    boxShadow: "0 6px 30px rgba(0,255,255,0.14), 0 0 40px rgba(138,43,226,0.35)",
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
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #6C4AB6",
    backgroundColor: "#1e1e2e",
    color: "#fff",
    outline: "none",
  },
  addBtn: {
    marginTop: "10px",
    padding: "12px",
    width: "100%",
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
    boxShadow: "0 8px 36px rgba(0,255,255,0.12), 0 0 40px rgba(138,43,226,0.28)",
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
