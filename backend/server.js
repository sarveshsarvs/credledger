// server.js
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

// Ensure authentication.json exists
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]", "utf8");

// Ensure issuer_profile.json exists
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

function createHash(password, timestamp) {
  return crypto.createHash("sha256").update(password + timestamp).digest("hex");
}

// -------------------- Routes --------------------

// Signup / Registration
app.post("/api/signup", (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ message: "Name, email, and password required" });
  }

  const users = loadUsers();
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const timestamp = new Date().toISOString();
  const hash = createHash(password, timestamp);

  // Save to authentication.json
  users.push({ email, timestamp, hash });
  saveUsers(users);

  // Save to issuer_profile.json (name + email, no hash)
  const issuers = loadIssuers();
  issuers.push({ name, email, role });
  saveIssuers(issuers);

  res.json({ message: "Signup successful" });
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const users = loadUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "User not found" });

  const hash = createHash(password, user.timestamp);
  if (hash === user.hash) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
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
