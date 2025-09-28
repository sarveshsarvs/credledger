import fs from "fs";
import crypto from "crypto";

const filePath = "blockchain.json";

export function loadChain() {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath));
}

export function saveChain(chain) {
  fs.writeFileSync(filePath, JSON.stringify(chain, null, 2));
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

