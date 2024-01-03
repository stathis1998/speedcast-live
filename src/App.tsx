import { useState } from "react";
import "./styles.css";
import AddressTable from "./AddressTable";
import Instructions from "./Instructions";

export default function App() {
  const [showInstructions, setShowInstrunctions] = useState(false);
  return (
    <div className="App">
      <div className="row">
        <button onClick={() => setShowInstrunctions(!showInstructions)}>
          Toggle Instructions
        </button>
      </div>
      {showInstructions ? <Instructions /> : <AddressTable />}
    </div>
  );
}
