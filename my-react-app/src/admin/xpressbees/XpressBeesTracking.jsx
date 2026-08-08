import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Delhivery.css";

function XpressBeesTracking() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");

  const [awbNumber, setAwbNumber] = useState("");
  const [type, setType] = useState("Parent");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/xpressbees/clients")
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((error) => console.error(error));
  }, []);

  

  const trackShipment = async () => {
    if (!selectedClient) {
      alert("Please select a client");
      return;
    }

    if (!awbNumber) {
      alert("Please enter AWB Number");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/xpressbees/tracking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            awbNumber,
            type,
            clientId: selectedClient,
          }),
        }
      );

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error tracking shipment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delhivery-page">
      <div className="delhivery-card">

        <div className="card-header-actions">
          <Link
            to="/home"
            className="back-link"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <h1 className="delhivery-title">
          XpressBees Tracking
        </h1>

        <p className="delhivery-subtitle">
          Select Client and Track Shipment
        </p>

        {/* Client */}

        <div className="form-group">
          <label>Client</label>

          <select
            value={selectedClient}
            onChange={(e) =>
              setSelectedClient(e.target.value)
            }
          >
            <option value="">
              Select Client
            </option>

            {clients.map((client) => (
              <option
                key={client.id}
                value={client.id}
              >
                {client.client_name}
              </option>
            ))}
          </select>
        </div>

        {/* XB Key */}

        

        {/* AWB */}

        <div className="form-group">
          <label>AWB Number</label>

          <input
            type="text"
            placeholder="Enter AWB Number"
            value={awbNumber}
            onChange={(e) =>
              setAwbNumber(e.target.value)
            }
          />
        </div>

        {/* Type */}

        <div className="form-group">
          <label>Type</label>

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
          >
            <option value="Parent">
              Parent
            </option>

            <option value="Child">
              Child
            </option>
          </select>
        </div>

        <button
          className="generate-btn"
          onClick={trackShipment}
        >
          {loading
            ? "Tracking..."
            : "Track Shipment"}
        </button>

        {result && (
          <div className="token-box">
            <h3>
              Tracking Response
            </h3>

            <textarea
              readOnly
              value={JSON.stringify(
                result,
                null,
                2
              )}
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default XpressBeesTracking;