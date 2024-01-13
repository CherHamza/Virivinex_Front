import React, { useState, useEffect } from 'react';
import "../../css/footer.css";



export const Footer = () => {


return (

<footer className="footer">
  <div className="container">
    <div className="row">
      <div className="col-md-4 footer-column">
        <ul className="nav flex-column">
          <li className="nav-item">
            <span className="footer-title">Winery</span>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Découvrir</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">New editions</a>
          </li>
        </ul>
      </div>
      <div className="col-md-4 footer-column">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#">About Us</a>
          </li>
          </ul>
      </div>
      <div className="col-md-4 footer-column">
        <ul className="nav flex-column">
          <li className="nav-item">
            <span className="footer-title">Contact & Support</span>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Contact us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Support</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">FAQ</a>
          </li>
        </ul>
      </div>
    </div>

    <div className="text-center small">©2023 Verivinex</div>
  </div>
</footer>
    )
}
