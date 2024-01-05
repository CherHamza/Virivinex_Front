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
        // window.location.reload();
        
        setEmail("");
        setPassword("");
        //window.location.href = userService.userAccountPage;
      }
    });


  };
 
  return (
    <div className={`modal ${handleShowLoginModal ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: handleShowLoginModal ? "block" : "none" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
            <button type="button" className="close" onClick={handleCloseLoginModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="emailLogin">Email</label>
              <input type="email" className="form-control" id="emailLogin" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="passwordLogin">Password</label>
              <input type="password" className="form-control" id="passwordLogin" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCloseLoginModal}>
              Annuler
            </button>
            <button type="button" className="btn btn-primary" onClick={handleLogin}>
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;