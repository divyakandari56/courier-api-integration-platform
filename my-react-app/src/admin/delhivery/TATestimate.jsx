import { useState } from "react";
import "../../styles/Delhivery.css";

function TatEstimate() {
  const [originPin, setOriginPin] = useState("");
  const [destinationPin, setDestinationPin] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkTat = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/tat?origin_pin=${originPin}&destination_pin=${destinationPin}`
      );

      const data = await response.json();

      console.log("TAT Response:", data);

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error checking TAT");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="delhivery-title">
        TAT Estimate
      </h1>

      <p className="delhivery-subtitle">
        Check estimated transit time between two pincodes.
      </p>

      <div className="form-group">
        <label>Origin Pincode</label>

        <input
          type="text"
          placeholder="Enter Origin Pincode"
          value={originPin}
          onChange={(e) => setOriginPin(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Destination Pincode</label>

        <input
          type="text"
          placeholder="Enter Destination Pincode"
          value={destinationPin}
          onChange={(e) => setDestinationPin(e.target.value)}
        />
      </div>

      <button
        className="generate-btn"
        onClick={checkTat}
      >
        {loading ? "Checking..." : "Check TAT"}
      </button>

      {result && (
        <div className="token-box">
          <h3>TAT Response</h3>

          <textarea
            readOnly
            value={JSON.stringify(result, null, 2)}
          />
        </div>
      )}
    </>
  );
}

export default TatEstimate;