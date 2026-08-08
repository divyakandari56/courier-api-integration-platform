const express = require("express");
const cors = require("cors");
const { sql, config } = require("./db");
const axios = require("axios");
require("dotenv").config();

async function getDelhiveryToken() {
  const loginResponse = await axios.post(
    "https://ltl-clients-api.delhivery.com/ums/login",
    {
      username: process.env.DELHIVERY_USERNAME,
      password: process.env.DELHIVERY_PASSWORD,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return loginResponse.data.data.jwt;
}

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect()
  .then(conn => {
    console.log("Database connection established.");
    return conn;
  })
  .catch(err => {
    console.error("Database connection failed:", err.message);
    return null;
  });

// Delhivery
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/users", async (req, res) => {
  try {
    await poolConnect;
    const request = pool.request();
    const result = await request.query("SELECT * FROM users");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    await poolConnect;
    const request = pool.request();
    request.input("username", sql.VarChar, username);
    request.input("password", sql.VarChar, password);

    const result = await request.query(
      "SELECT * FROM users WHERE email = @username AND password_hash = @password"
    );

    if (result.recordset.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
});
// Delhivery Login API
app.post("/delhivery/token", async (req, res) => {
  console.log("DELHIVERY API CALLED");
  const { username, password } = req.body;
  console.log("Delhivery login request received for:", username);

  try {
    console.log("Calling Delhivery API...");
    const response = await axios.post(
      "https://ltl-clients-api.delhivery.com/ums/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

console.log("Delhivery Response Status:", response.status);
const jwtToken = response.data.data.jwt;

await poolConnect;

const dbRequest = pool.request();

dbRequest.input("username", sql.VarChar, username);
dbRequest.input("token", sql.NVarChar(sql.MAX), jwtToken);

await dbRequest.query(`
  INSERT INTO delhivery_tokens (username, token)
  VALUES (@username, @token)
`);
return res.json({
  success: true,
  token: jwtToken,
});
  

  } catch (error) {
    console.error("=== DELHIVERY API ERROR ===");
    console.error("Status Code:", error.response?.status);
    console.error("Error Response:", error.response?.data);
    console.error("Error Message:", error.message);
    console.error("===========================");

    res.status(error.response?.status || 500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

app.get("/pincode/:pincode", async (req, res) => {
  try {
    const { pincode } = req.params;

    // Login API
  const loginResponse = await axios.post(
  "https://ltl-clients-api.delhivery.com/ums/login",
  {
    username: process.env.DELHIVERY_USERNAME,
    password: process.env.DELHIVERY_PASSWORD,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

const token = loginResponse.data.data.jwt;

console.log("Token Generated");

    // Pincode Serviceability API
const pincodeResponse = await axios.get(
  `https://ltl-clients-api.delhivery.com/pincode-service/${pincode}?weight=1`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);

res.json(pincodeResponse.data);

  } catch (error) {
  console.error("PINCODE API ERROR:");
  console.error(error.response?.data || error.message);

  res.status(500).json({
    success: false,
    error: error.response?.data || error.message,
  });
}
});
app.get("/tat", async (req, res) => {
  try {
    const { origin_pin, destination_pin } = req.query;

    // Login API
   const loginResponse = await axios.post(
  "https://ltl-clients-api.delhivery.com/ums/login",
  {
    username: process.env.DELHIVERY_USERNAME,
    password: process.env.DELHIVERY_PASSWORD,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

const token = loginResponse.data.data.jwt;

    // TAT API
        const tatResponse = await axios.get(
          `https://ltl-clients-api.delhivery.com/tat/estimate?origin_pin=${origin_pin}&destination_pin=${destination_pin}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        res.json(tatResponse.data);

      } catch (error) {
        console.error(error.response?.data || error.message);

        res.status(500).json({
          success: false,
          error: error.response?.data || error.message,
        });
      }
    });
   app.get("/tracking/:lrnum", async (req, res) => {
  try {
    const { lrnum } = req.params;

    const token = await getDelhiveryToken();

    const trackingResponse = await axios.get(
      `https://ltl-clients-api.delhivery.com/lrn/track?lrnum=${lrnum}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(trackingResponse.data);
  } catch (error) {
    console.error("TRACKING API ERROR:");
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});


app.get("/pod/:lrn", async (req, res) => {
  try {
    const { lrn } = req.params;

    const token = await getDelhiveryToken();

    const podResponse = await axios.get(
      `https://ltl-clients-api.delhivery.com/document/download?lrn=${lrn}&doc_type=LM_POD&audo_download=false&version=latest`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(podResponse.data);
  } catch (error) {
    console.error("POD API ERROR:");
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

// =====================================
// XPRESSBEES CLIENTS API
// =====================================

app.get("/xpressbees/clients", async (req, res) => {
  try {
    await poolConnect;

    const result = await pool.request().query(`
      SELECT
        id,
        client_name
      FROM xpressbees_clients
      ORDER BY client_name
    `);

    res.json(result.recordset);

  } catch (error) {
    console.error("XPRESSBEES CLIENTS ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// =====================================
// XPRESSBEES TRACKING API
// =====================================

app.post("/xpressbees/tracking", async (req, res) => {
  try {
    const {
      awbNumber,
      type,
      clientId,
    } = req.body;

    if (!awbNumber || !type || !clientId) {
      return res.status(400).json({
        success: false,
        error:
          "AWB Number, Type and Client are required",
      });
    }

    await poolConnect;

    const clientResult = await pool
      .request()
      .input("id", sql.Int, clientId)
      .query(`
        SELECT
          client_name,
          xb_key
        FROM xpressbees_clients
        WHERE id = @id
      `);

    if (clientResult.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Client not found",
      });
    }

    const client =
      clientResult.recordset[0];

    const response = await axios.post(
      "http://xbclientapi.xbees.in/TrackingService.svc/CargoShipmentTracking",
      {
        AWBNumber: awbNumber,
        Type: type,
      },
      {
        headers: {
          "Content-Type": "application/json",
          XBkey: client.xb_key,
        },
      }
    );

    res.json({
      success: true,
      client: client.client_name,
      data: response.data,
    });

  } catch (error) {
    console.error(
      "XPRESSBEES TRACKING ERROR:"
    );

    console.error(
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      error:
        error.response?.data ||
        error.message,
    });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});