import express from "express";
import multer from "multer";
import crypto from "crypto";
import cors from "cors";
import fs from "fs";
import path from "path";
import { addBlock, verifyCredential } from "./blockchain.js";

const PORT = 3000;
const HOST = "0.0.0.0";

const app = express();
const upload = multer({ dest: "uploads/" });

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

function createHash(value, salt = "") {
  return crypto.createHash("sha256").update(value + salt).digest("hex");
}

// -------------------- Routes --------------------

// Signup / Registration
app.post("/api/signup", (req, res) => {
  const { name, email, password, role, institution } = req.body;
  if (!name || !email || !password || !role || !institution) {
    return res.status(400).json({ message: "All fields required" });
  }

  const users = loadUsers();
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const timestamp = new Date().toISOString();
  const hash = createHash(password, timestamp);

  users.push({ email, timestamp, hash });
  saveUsers(users);

  const issuers = loadIssuers();
  issuers.push({ name, email, role, institution, learners: [] });
  saveIssuers(issuers);

  res.json({ message: "Signup successful" });
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password, role, hash } = req.body;

  // Verifier login using hash
  if (role === "verifier") {
    if (!hash) return res.status(400).json({ message: "Hash required" });
    const result = verifyCredential(hash);
    if (result) return res.json({ message: "Credential valid", credential: result });
    else return res.status(404).json({ message: "Credential invalid" });
  }

  // Issuer login using email/password
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const users = loadUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });

  const hashed = createHash(password, user.timestamp);
  if (hashed === user.hash) {
    return res.json({ message: "Login successful", issuerEmail: email });
  } else {
    return res.status(401).json({ message: "Invalid password" });
  }
});

// Add Learner
app.post("/api/add-learner", (req, res) => {
  const { name, email, phone, completionDate, skill, skillDescription, issuerEmail } = req.body;

  if ( !issuerEmail || !name || !email || !phone || !completionDate || !skill || !skillDescription) {
    return res.status(400).json({ message: "All fields required" });
  }

  const issuers = loadIssuers();
  const issuer = issuers.find((i) => i.email === issuerEmail);
  if (!issuer) return res.status(404).json({ message: "Issuer email not found" });
  const learnerHash = createHash(name + email + phone + completionDate + skill);
  const newLearner = { name, email, phone, completionDate, skill, skillDescription, hash: learnerHash };
  issuer.learners.push(newLearner);
  saveIssuers(issuers);

  res.json({ message: "Learner added successfully", learner: newLearner });
});

// Get Learners for issuer
app.get("/api/learners", (req, res) => {
  const issuerEmail = req.query.issuerEmail;
  if (!issuerEmail) return res.status(400).json({ message: "issuerEmail query required" });

  const issuers = loadIssuers();
  const issuer = issuers.find((i) => i.email === issuerEmail);
  if (!issuer) return res.status(404).json({ message: "Issuer not found" });

  res.json(issuer.learners || []);
});

// Issue Credential
app.post("/issue", upload.single("file"), async (req, res) => {
  try {
    const fileBuffer = req.file ? fs.readFileSync(req.file.path) : null;
    const hash = crypto
      .createHash("sha256")
      .update(req.body.learner + (fileBuffer || "") + Date.now())
      .digest("hex");

    const credential = {
      learner: req.body.learner,
      title: req.body.title || "Default Credential",
      hash,
    };

    const block = addBlock(credential);
    res.json({ status: "success", credentialHash: block.credential.hash });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error issuing credential");
  }
});

// Verify Credential
app.get("/verify/:hash", (req, res) => {
  const result = verifyCredential(req.params.hash);
  if (result) {
    res.json({ valid: true, block: result });
  } else {
    res.json({ valid: false });
  }
});

app.get("/", (req, res) => {
  res.send("Credential backend is running!");
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});