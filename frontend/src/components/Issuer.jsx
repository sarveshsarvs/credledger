import { useState } from "react";
import axios from "axios";

export default function Issuer() {
  const [file, setFile] = useState(null);
  const [learner, setLearner] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("file", file);
    form.append("learner", learner);

    const res = await axios.post("http://localhost:3000/issue", form);
    alert("Credential Issued! Hash: " + res.data.credentialHash);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Learner ID / Wallet" onChange={(e) => setLearner(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Issue Credential</button>
    </form>
  );
}
