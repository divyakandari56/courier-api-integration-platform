import { useState } from "react";
import "../../styles/Delhivery.css";

function PincodeServiceability() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkPincode = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/pincode/${pincode}`
      );

      const data = await response.json();

      console.log("Pincode Response:", data);

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error checking pincode");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="delhivery-title">
        Pincode Serviceability
      </h1>

      <p className="delhivery-subtitle">
        Check whether a pincode is serviceable.
      </p>

      <div className="form-group">
        <label>Pincode</label>

        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
      </div>

      <button
        className="generate-btn"
        onClick={checkPincode}
      >
        {loading ? "Checking..." : "Check Serviceability"}
      </button>

      {result && (
        <div className="token-box">
          <h3>Response</h3>

          <textarea
            readOnly
            value={JSON.stringify(result, null, 2)}
          />
        </div>
      )}
    </>
  );
}

export default PincodeServiceability;