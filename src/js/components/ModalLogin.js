import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom'; // Import useNavigate
import { userService } from "../services/userService";
import { dataService } from "../services/dataService";

const ModalLogin = ({ handleShowLoginModal, handleCloseLoginModal, userType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userTypeD, setUserType] = useState("");
  const navigate = useNavigate(); // Initialisation de useNavigate



  const handleLogin = () => {
    userService.login(email, password, false).then(async (res) => {
      console.log(res);
      if (!res.ok) {
        let response = res.status !== 401 ? await res.json() : "Identifiants incorrects.";
        console.error("Failure:", response);
        toast.error("Identifiants incorrects.");
      } else {
        toast.success("Connexion réussie !");
        handleCloseLoginModal();
        window.location.reload();
        
        setEmail("");
        setPassword("");
        //window.location.href = userService.userAccountPage;
      }
    });

  };
 
  return (
    <div className={`modal fade ${handleShowLoginModal ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: handleShowLoginModal ? "block" : "none", backgroundColor: "rgba(0,0,0,0.5)" }}>

      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content border-0 shadow">
          <div className="modal-header" style={{ backgroundColor: "#4B2E83", color: "#FFF" }}>
            <h5 className="modal-title mx-auto">Login</h5>
            <button type="button" className="close btn btn-danger" onClick={handleCloseLoginModal}>
              <span aria-hidden="true" style={{ color: "#FFF" }}>&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ backgroundColor: "#F2F2F2" }}>
            <div className="form-group">
              <label htmlFor="emailLogin">Email</label>
              <input type="email" className="form-control" id="emailLogin" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="passwordLogin">Mot de passe</label>
              <input type="password" className="form-control" id="passwordLogin" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className="modal-footer" style={{ backgroundColor: "#F2F2F2" }}>
            <button type="button" className="btn" style={{ backgroundColor: "#4B2E83", color: "#FFF" }} onClick={handleLogin}>
              Log In
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCloseLoginModal}>
              Cancel
            </button>

         
      </div>
    </div>
  </div>
  
  );
};

export default ModalLogin;