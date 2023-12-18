import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import App from "./App.js"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/app/index.html" element={<App />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
    <ToastContainer />
  </React.StrictMode>
);
