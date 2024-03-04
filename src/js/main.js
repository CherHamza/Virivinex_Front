import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import App from "./App.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IndiviudalProfil from "./components/Individual/IndividualProfil.js";
import ExpertProfil from "./components/Expert/ExpertProfil.js";
import ProducerProfil from "./components/Producer/ProducerProfil.js";
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import LandingPageVerif from "./components/LandingPageVerif.js";
import Emission from './components/Emission';
import AdministrationProfile from './components/Admin/AdministrationProfile.js'
import DetailEmission from './components/Admin/DetailEmission.js';
import AllEmissionsPage from './components/AllEmissionPage.js';
import 'whatwg-fetch';


const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
    <Header />
      <Routes>
      <Route path="/app/account/app.html" element={<LandingPageVerif />}/>
        <Route path="/" element={<Home />} />
        <Route path="/app/index.html" element={<App />} />
        <Route path="/app/home.html" element={<Home />} />
        <Route path="/app/AllEmissionsPage.html" element={<AllEmissionsPage />} />
        <Route path="/app/account/individual.html" element={<IndiviudalProfil/>}/>
        <Route path="/app/account/expert.html" element={<ExpertProfil/>}/>
        <Route path="/app/account/producer.html" element={<ProducerProfil />}/>
        <Route path="/app/admin.html" element={<AdministrationProfile />}/>
        <Route path='/app/admin/:id/detail.html' element={<DetailEmission />}/>
        <Route path="/app/sot/emissions/:name/:id/detail.html" element={<Emission />}/>

      </Routes>
      <Footer />
    </Router>
    <ToastContainer />
  </React.StrictMode>
);
