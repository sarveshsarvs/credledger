# CredLedger

Blockchain-backed credential verification system using Node.js and React.

---

## 1. Introduction

CredLedger is a credential management system that ensures integrity, traceability, and verifiability of issued certificates.

The system uses a custom blockchain implementation where each credential is stored as a block. Each block contains a hash and reference to the previous block, ensuring immutability.

---

## 2. System Architecture

Client (React) → REST API (Node.js/Express) → Blockchain Module → JSON Storage

- Frontend handles user interaction
- Backend processes requests and business logic
- Blockchain module ensures data integrity
- JSON files persist data

---

## 3. Project Structure

credledger/
│
├── backend/
│   ├── database/
│   │   ├── authentication.json
│   │   ├── blockchain.json
│   │   ├── issuer_profile.json
│   │
│   ├── blockchain.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── Login.js
│   │   ├── index.js
│   │   └── index.css
│
├── package.json
└── README.md

---

## 4. Data Model

Block Structure:

{
  "index": 1,
  "timestamp": "ISO_DATE",
  "data": {
    "issuer": "string",
    "recipient": "string",
    "credential": "string"
  },
  "previousHash": "string",
  "hash": "string"
}

---

## 5. Workflow

1. Issuer logs into the system
2. Issues a credential
3. Credential data is hashed
4. New block is created
5. Block is appended to the chain
6. Chain is saved to blockchain.json
7. Credential can be verified later

---

## 6. Blockchain Logic

- Each block contains hash of previous block
- Hash ensures data integrity
- Any modification breaks the chain
- Chain validation ensures authenticity

---

## 7. API Overview

Authentication:
POST /login

Credential Management:
POST /issue
GET /verify/:id

---

## 8. Security

- Hash-based integrity verification
- Immutable chain structure
- Controlled access via authentication

---

## 9. Setup

Clone repository:
git clone https://github.com/your-username/credledger.git
cd credledger

Install dependencies:
npm install

Run backend:
cd backend
node server.js

Run frontend:
cd frontend
npm start

---

## 10. Limitations

- Uses JSON storage (not scalable)
- Not fully decentralized
- No consensus mechanism
- No wallet-based authentication

---

## 11. Future Improvements

- Use database instead of JSON
- Integrate real blockchain (Ethereum/Hyperledger)
- Add smart contracts
- Add cryptographic signatures
- Improve authentication

---

## License

MIT
