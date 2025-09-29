import fs from "fs";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const filePath = "blockchain.json";
const ALGO = "aes-256-cbc";

// Load secret key & IV from .env
const SECRET_KEY = Buffer.from(process.env.SECRET_KEY, "base64"); // 32 bytes
const IV = Buffer.from(process.env.IV, "base64"); // 16 bytes

// --- AES encryption/decryption ---
function encryptBlock(block) {
  const cipher = crypto.createCipheriv(ALGO, SECRET_KEY, IV);
  let encrypted = cipher.update(JSON.stringify(block), "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decryptBlock(encrypted) {
  const decipher = crypto.createDecipheriv(ALGO, SECRET_KEY, IV);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
}

// --- Blockchain core functions ---
export function loadChain() {
  if (!fs.existsSync(filePath)) return [];
  const raw = JSON.parse(fs.readFileSync(filePath));
  return raw.map(encBlock => decryptBlock(encBlock));
}

export function saveChain(chain) {
  const encryptedChain = chain.map(block => encryptBlock(block));
  fs.writeFileSync(filePath, JSON.stringify(encryptedChain, null, 2));
}

export function calculateHash(index, timestamp, credential, previousHash) {
  return crypto.createHash("sha256")
    .update(index + timestamp + JSON.stringify(credential) + previousHash)
    .digest("hex");
}

export function addBlock(credential) {
  const chain = loadChain();
  const previousBlock = chain[chain.length - 1] || { index: -1, hash: "0" };
  const index = previousBlock.index + 1;
  const timestamp = Date.now();
  const previousHash = previousBlock.hash;
  const hash = calculateHash(index, timestamp, credential, previousHash);

  const newBlock = { index, timestamp, credential, previousHash, hash };
  chain.push(newBlock);
  saveChain(chain);
  return newBlock;
}

export function verifyCredential(hash) {
  const chain = loadChain();
  return chain.find(block => block.credential.hash === hash) || null;
}
