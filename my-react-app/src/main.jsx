import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/style.css";

import App from "./App";
import Home from "./Home";
import Delhivery from "./admin/delhivery/Delhivery";
import XpressBees from "./admin/xpressbees/XpressBees";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/delhivery" element={<Delhivery />} />
      <Route path="/xpressbees" element={<XpressBees />} />
    </Routes>
    
  </BrowserRouter>
);