import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { UserTypeButton } from './UserType';



const ModalLogin = ({ handleShowLoginModal, handleCloseLoginModal, userType }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [userTypeD, setUserType] = useState("");
  
    const handleLogin = () => {
        fetch('http://localhost:5000/users')
        .then(response => response.json())
        .then(users => {
             const userData = users.find(user => user.email === email && user.password === password);
             console.log('user ' + userData)
            if (userData) {
                toast.success("Connexion réussie !");
                console.log('user ' + userData.email);
                
                handleCloseLoginModal();
                setAuthenticated(true);
                
                setUserType(userData.userType)
              console.log('user ' + userData.userType);

            } else {
                toast.error("Identifiants incorrects.");
            }
        })
        .catch(error => {
            console.error("Erreur lors de la connexion :", error);
            toast.error("Erreur lors de la connexion.");
        });

  
      setEmail("");
      setPassword("");
    };
    
  // Authenticated ok
  if (isAuthenticated) {
    console.log("userType", userTypeD);
    // TODO:
    // Setting up a switch
    switch (userTypeD) {
      case "Wine Expert":
        return <Navigate to="/app/expert.html" />;
      case "Wine Producer":
        return <Navigate to="/app/producer.html" />;
      case "Individual":
        return <Navigate to="/app/individual.html" />;
      default:
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
  