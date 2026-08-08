import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Delhivery.css";

import PincodeServiceability from "./Pincodeserviceability";
import TatEstimate from "./TATestimate";
import ShipmentTracking from "./Shipmenttracking";
import PODDownload from "./PODDownload";

function Delhivery() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("token");

  const generateToken = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/delhivery/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(`Error: ${data.error || "Unknown error"}`);
        return;
      }

      if (data.success) {
        setToken(data.token);
        alert("Token generated successfully!");
      } else {
        alert(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delhivery-page">
      <div className="delhivery-card">
        <div className="card-header-actions">
          <Link to="/home" className="back-link">
            <span className="arrow">←</span> Back to Dashboard
          </Link>
        </div>

        <div className="tabs">
          <button
            className={activeTab === "token" ? "active-tab" : ""}
            onClick={() => setActiveTab("token")}
          >
            Token Generator
          </button>

          <button
            className={activeTab === "pincode" ? "active-tab" : ""}
            onClick={() => setActiveTab("pincode")}
          >
            Pincode Serviceability
          </button>

          <button
            className={activeTab === "tat" ? "active-tab" : ""}
            onClick={() => setActiveTab("tat")}
          >
            TAT Estimate
          </button>

          <button
            className={activeTab === "tracking" ? "active-tab" : ""}
            onClick={() => setActiveTab("tracking")}
          >
            Shipment Tracking
          </button>

          <button
            className={activeTab === "pod" ? "active-tab" : ""}
            onClick={() => setActiveTab("pod")}
          >
            POD Download
          </button>
        </div>

        {activeTab === "token" && (
          <>
            <h1 className="delhivery-title">
              Delhivery Token Generator
            </h1>

            <p className="delhivery-subtitle">
              Enter API credentials and generate JWT token.
            </p>

            <div className="form-group">
              <label>Username</label>

              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="generate-btn"
              onClick={generateToken}
            >
              {loading ? "Generating..." : "Generate Token"}
            </button>

            {token && (
              <div className="token-box">
                <h3>Generated JWT Token</h3>

                <textarea
                  readOnly
                  value={token}
                />

                <button
                  className="copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(token)
                  }
                >
                  Copy Token
                </button>
              </div>
            )}
          </>
        )}

        {activeTab === "pincode" && (
          <PincodeServiceability />
        )}

        {activeTab === "tat" && (
          <TatEstimate />
        )}

        {activeTab === "tracking" && (
          <ShipmentTracking />
        )}

        {activeTab === "pod" && (
          <PODDownload />
        )}

      </div>
    </div>
  );
}

export default Delhivery;