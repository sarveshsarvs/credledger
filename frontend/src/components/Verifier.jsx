import { useState } from "react";
import axios from "axios";

export default function Verifier() {
  const [hash, setHash] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://192.168.137.63:3000/verify/${hash}`);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ valid: false });
    }
  };

  return (
    <div>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter credential hash"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
        />
        <button type="submit">Verify Credential</button>
      </form>

      {result && (
        <div style={{ marginTop: "1em" }}>
          {result.valid ? (
            <div>
              ✅ Credential is valid!<br />
              Learner: {result.block.credential.learner}<br />
              Title: {result.block.credential.title}<br />
              Block Hash: {result.block.hash}
            </div>
          ) : (
            <div>❌ Credential not found or invalid.</div>
          )}
        </div>
      )}
    </div>
  );
}
