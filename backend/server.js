const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");
const pinataSDK = require("@pinata/sdk");
require("dotenv").config();

// --- Ethers v6 imports ---
const { JsonRpcProvider, Wallet, Contract, keccak256, toUtf8Bytes } = require("ethers");

const app = express();
const upload = multer({ dest: "uploads/" });

// --- Blockchain Setup ---
const provider = new JsonRpcProvider("https://rpc-mumbai.maticvigil.com");

const privateKey = process.env.ISSUER_KEY;
const wallet = new Wallet(privateKey, provider);

const contractABI = JSON.parse(fs.readFileSync("abi.json"));
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const contract = new Contract(contractAddress, contractABI, wallet);

// --- Pinata (IPFS) Setup ---
const pinata = new pinataSDK({
  pinataApiKey: process.env.PINATA_KEY,
  pinataSecretApiKey: process.env.PINATA_SECRET,
});

// --- API Endpoints ---

// Issue credential
app.post("/issue", upload.single("file"), async (req, res) => {
  try {
    const fileBuffer = fs.readFileSync(req.file.path);
    const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

    // Upload file to IPFS
    const ipfsResult = await pinata.pinFileToIPFS(fs.createReadStream(req.file.path));

    // Call smart contract
    const tx = await contract.issueCredential(
      req.body.learner,
      keccak256(toUtf8Bytes(hash))
    );
    await tx.wait();

    res.json({
      status: "success",
      credentialHash: hash,
      ipfsHash: ipfsResult.IpfsHash,
      txHash: tx.hash,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error issuing credential");
  }
});

// Verify credential
app.get("/verify/:hash", async (req, res) => {
  try {
    const hashBytes = keccak256(toUtf8Bytes(req.params.hash));
    const valid = await contract.verifyCredential(hashBytes);
    res.json({ valid });
  } catch (err) {
    console.error(err);
    res.status(500).send("Verification failed");
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
