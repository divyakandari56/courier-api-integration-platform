import { useState } from "react";
import "../../styles/Delhivery.css";

function PODDownload() {
  const [lrn, setLrn] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPod = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/pod/${lrn}`
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.error?.message || "POD not found");
        return;
      }

      setResult(data);

    } catch (error) {
      console.error(error);
      alert("Error fetching POD");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="delhivery-title">
        POD Download
      </h1>

      <p className="delhivery-subtitle">
        Download POD using LR Number.
      </p>

      <div className="form-group">
        <label>LR Number</label>

        <input
          type="text"
          placeholder="Enter LR Number"
          value={lrn}
          onChange={(e) => setLrn(e.target.value)}
        />
      </div>

      <button
        className="generate-btn"
        onClick={getPod}
      >
        {loading ? "Loading..." : "Get POD"}
      </button>

      {result?.data?.files?.length > 0 && (
        <div className="token-box">
          <h3>POD Available</h3>

          <a
            href={result.data.files[0].url}
            target="_blank"
            rel="noreferrer"
            className="generate-btn"
          >
            Download POD PDF
          </a>
        </div>
      )}
    </>
  );
}

export default PODDownload;