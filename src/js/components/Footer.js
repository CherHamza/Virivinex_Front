import React, { useState, useEffect } from 'react';
import "../../css/footer.css";
import Logo from "../../../assets/images/grapes.png"


export const Footer = () => {


  return (

    <footer className="footer">
      <div className="container-fluid">
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
                <img src={Logo} alt="Logo" className="footer-logo" />
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

// export const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="container-fluid">
//         <div className="row">
//           {/* Box One */}
//           <div className="col boxOne">
//             <ul>
//               <li>
//                 <span>Winery</span>
//               </li>
//               <li>
//                 <a href="#">Découvrir</a>
//               </li>
//               <li>
//                 <a href="#">New editions</a>
//               </li>
//             </ul>
//           </div>

//           {/* Box Two */}
//           <div className="col boxTwo">
//             <ul>
//               <li>
//                 <a href="#">About Us</a>
//                 <img src={Logo} alt="Logo" className="footer-logo" />
//               </li>
//             </ul>
//           </div>

//           {/* Box Three */}
//           <div className="col boxThree">
//             <ul>
//               <li>
//                 <span>Contact & Support</span>
//               </li>
//               <li>
//                 <a href="#">Contact us</a>
//               </li>
//               <li>
//                 <a href="#">Support</a>
//               </li>
//               <li>
//                 <a href="#">FAQ</a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="text-center small">©2023 Verivinex</div>
//       </div>
//     </footer>
//   )
// }
