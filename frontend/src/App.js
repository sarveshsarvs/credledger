import Issuer from "./components/Issuer";
import Verifier from "./components/Verifier";
import Issuer2 from "./components/LoginPage";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Credential System Demo</h1>
      <div style={{ marginBottom: "2rem" }}>
        <h2>Issue Credential</h2>
        <Issuer />
      </div>

      <div>
        <h2>Verify Credential</h2>
        <Verifier />
      </div>
    </div>
  );
}

export default App;
