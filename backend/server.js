// server.js
import express from "express";
import multer from "multer";
import crypto from "crypto";
import cors from "cors";
import fs from "fs";
import { addBlock, verifyCredential } from "./utils/blockchain.js"; // note .js

const app = express();
const upload = multer({ dest: "uploads/" });
app.use(cors());
app.use(express.json());

// Issue credential
app.post("/issue", upload.single("file"), async (req, res) => {
  try {
    const fileBuffer = req.file ? fs.readFileSync(req.file.path) : null;
    const hash = crypto.createHash("sha256")
      .update(req.body.learner + (fileBuffer || "") + Date.now())
      .digest("hex");

    const credential = {
      learner: req.body.learner,
      title: req.body.title || "Default Credential",
      hash
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

app.get("/", (req, res) => {
  res.send("Credential backend is running!");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
