import express from "express";
import crypto from "crypto";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;
const HOST = "0.0.0.0";

app.use(cors());
app.use(express.json());

// -------------------- Paths --------------------
const DB_DIR = path.join("database");
const USERS_FILE = path.join(DB_DIR, "authentication.json");
const ISSUER_FILE = path.join(DB_DIR, "issuer_profile.json");

// Ensure database folder exists
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]", "utf8");
if (!fs.existsSync(ISSUER_FILE)) fs.writeFileSync(ISSUER_FILE, "[]", "utf8");

// -------------------- Helpers --------------------
function loadUsers() {
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}
function loadIssuers() {
  return JSON.parse(fs.readFileSync(ISSUER_FILE, "utf8"));
}
function saveIssuers(issuers) {
  fs.writeFileSync(ISSUER_FILE, JSON.stringify(issuers, null, 2));
}
function createHash(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

// -------------------- Routes --------------------

// Signup
app.post("/api/signup", (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password || !name) return res.status(400).json({ message: "Name, email, and password required" });

  const users = loadUsers();
  if (users.find((u) => u.email === email)) return res.status(400).json({ message: "Email already exists" });

  const timestamp = new Date().toISOString();
  const hash = createHash(password + timestamp);

  users.push({ email, timestamp, hash });
  saveUsers(users);

  const issuers = loadIssuers();
  issuers.push({ name, email, role, learner_profiles: [] });
  saveIssuers(issuers);

  res.json({ message: "Signup successful" });
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  const users = loadUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "User not found" });

  const hash = createHash(password + user.timestamp);
  if (hash === user.hash) {
    res.json({ message: "Login successful", email });
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
});

// Add Learner
app.post("/api/add-learner", (req, res) => {
  const { issuerEmail, learnerName, learnerEmail, skill, issueDate, description } = req.body;
  if (!issuerEmail || !learnerName || !learnerEmail || !skill || !issueDate || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const issuers = loadIssuers();
  const issuer = issuers.find((i) => i.email === issuerEmail);
  if (!issuer) return res.status(400).json({ message: "Issuer email not found" });

  const dataString = `${learnerName}${learnerEmail}${skill}${issueDate}${description}`;
  const credHash = createHash(dataString);

  issuer.learner_profiles.push({
    learner_name: learnerName,
    learner_email: learnerEmail,
    skill,
    issueDate,
    description,
    cred_hash: credHash,
  });

  saveIssuers(issuers);
  res.json({ message: "Learner added", credHash });
});

// -------------------- Start Server --------------------
app.listen(PORT, HOST, () => console.log(`✅ Server running at http://${HOST}:${PORT}`));
