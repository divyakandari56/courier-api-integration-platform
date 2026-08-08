import { useState } from "react";
import "../../styles/Delhivery.css";

function ShipmentTracking() {
  const [lrnum, setLrnum] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const trackShipment = async () => {

    
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/tracking/${lrnum}`
      );

      const data = await response.json();

      console.log("Tracking Response:", data);

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error tracking shipment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="delhivery-title">
        Shipment Tracking
      </h1>

      <p className="delhivery-subtitle">
        Track shipment using LR Number.
      </p>

      <div className="form-group">
        <label>LR Number</label>

        <input
          type="text"
          placeholder="Enter LR Number"
          value={lrnum}
          onChange={(e) => setLrnum(e.target.value)}
        />
      </div>

      <button
        className="generate-btn"
        onClick={trackShipment}
      >
        {loading ? "Tracking..." : "Track Shipment"}
      </button>

      {result && (
        <div className="token-box">
          <h3>Tracking Response</h3>

          <textarea
            readOnly
            value={JSON.stringify(result, null, 2)}
          />
        </div>
      )}
    </>
  );
}

export default ShipmentTracking;