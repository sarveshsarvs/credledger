// server.js
import express from "express";
import multer from "multer";
import crypto from "crypto";
import cors from "cors";
import fs from "fs";
import { addBlock, verifyCredential } from "./utils/blockchain.js"; // blockchain utils

const PORT = 3000;
const HOST = "0.0.0.0";

const app = express();
const upload = multer({ dest: "uploads/" });
app.use(cors());
app.use(express.json());

const USERS_FILE = "database/authentication.json";

// ---------- Helpers ----------
function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function createHash(password, timestamp) {
  return crypto.createHash("sha256").update(password + timestamp).digest("hex");
}

// ---------- Authentication ----------

// Signup
app.post("/api/signup", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const users = loadUsers();
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const timestamp = new Date().toISOString();
  const hash = createHash(password, timestamp);

  users.push({ username, timestamp, hash });
  saveUsers(users);

  res.json({ message: "Signup successful" });
});

// Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const users = loadUsers();
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const hash = createHash(password, user.timestamp);
  if (hash === user.hash) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
});

// ---------- Blockchain Routes ----------

// Issue credential
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

// Verify credential
app.get("/verify/:hash", (req, res) => {
  const result = verifyCredential(req.params.hash);
  if (result) {
    res.json({ valid: true, block: result });
  } else {
    res.json({ valid: false });
  }
});

// Root
app.get("/", (req, res) => {
  res.send("Credential backend is running!");
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
