// Header.js
import React, { useState } from 'react';
import ModalLogin from './ModalLogin';
import { userService } from '../services/userService';
import { dataService } from '../services/dataService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';
import "../../css/home.css";



export const Header = () => {


  const navigate = useNavigate(); // Initialisation de useNavigate


  const [showModalLogin, setShowModalLogin] = useState(false);
  const handleShowLoginModal = () => setShowModalLogin(true);
  const handleCloseLoginModal = () => setShowModalLogin(false);
  const [isAuthenticated, setAuthenticated] = useState(false);


  const handleLogin = () => {
    console.log('Here handleClickLogin!!');
    // setSelectedUserType(userType);
    handleShowLoginModal();

  };

  const handleLogout = () => {
    try {
      if(dataService.isAuthenticated()){
        setAuthenticated(false);
       
        userService.logout();
        navigate("/app/home.html");
        toast.success("Déconnexion réussie !");
        window.location.reload();
       

      } else {
        toast.error("Erreur lors de la déconnexion.");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      toast.error("Erreur système lors de la déconnexion.");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light mb-3 mx-3">
        <a className="navbar-brand" href="#">Verivinex</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">

            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>

            
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-auth">
              <button className="nav-login btn"  onClick={handleLogin}>Login 
              </button>
            </li>
            <li className="nav-auth ">
              <a className="nav-logout btn" onClick={handleLogout}>Logout </a>
            </li>
    </ul>
        </div>
      </nav>

     

      <ModalLogin
        handleShowLoginModal={showModalLogin}
        handleCloseLoginModal={handleCloseLoginModal}
        // userType={userType}
      />

    </>

  );

}