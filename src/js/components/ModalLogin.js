import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { UserTypeButton } from './UserType';
import {userService} from "../services/userService";
import {dataService} from "../services/dataService";


const ModalLogin = ({ handleShowLoginModal, handleCloseLoginModal, userType }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [userTypeD, setUserType] = useState("");


    const handleLogin = () => {
      userService.login(email,password,false).then(async (res) => {
        console.log(res);
        if (!res.ok) {
          let response = res.status !== 401 ? await res.json() : "Identifiants incorrects.";
          console.error("Failure:", response);
          toast.error("Identifiants incorrects.");
        } else {
          toast.success("Connexion réussie !");
          handleCloseLoginModal();
          dataService.isAuthenticated().then(res =>{
            // setAuthenticated(res),
            console.log(res)
          } );
          dataService.getAuthenticatedProfile().then(user => {
            // Get user
            console.log(user)
            console.log(user.metaInfo.userType)
            setUserType(user.metaInfo.userType)
            
          }
            );
          setEmail("");
          setPassword("");
          //window.location.href = userService.userAccountPage;
        }
      });


    };
  // Authenticated ok

  if (userTypeD) {
    switch (userTypeD) {
      case "Wine Producer":
        return <Navigate to="/app/account/producer.html" />;
      case "Wine Expert":
        return <Navigate to="/app/account/expert.html" />;
      case "Individual":
        return <Navigate to="/app/account/individual.html" />;
      default:
        toast.error("Type d'utilisateur non reconnu.");
        return <Navigate to="/app/home.html" />;
    }
  }


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
