// Header.js
import React, { useState } from 'react';
import ModalLogin from './ModalLogin';


export const Header = () => {

  const [showModalLogin, setShowModalLogin] = useState(false);
  const handleShowLoginModal = () => setShowModalLogin(true);
  const handleCloseLoginModal = () => setShowModalLogin(false);

  const handleLogin = () => {
    console.log('Here handleClickLogin');
    // setSelectedUserType(userType);
    handleShowLoginModal();

  };

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
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

          <li className="nav-item active">
              <a className="nav-link" onClick={handleLogin}>Login <span className="sr-only">(current)</span>
              </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">Logout <span className="sr-only">(current)</span></a>
          </li>
        </ul>
        
      </div>
    </nav>

    <div className="header">
      <h1>Welcome to VERIVINEX!</h1>
      <p>Here you can find, buy and sell premium quality wines produced in limited edition series.</p>
    </div>

    <ModalLogin
      handleShowLoginModal={showModalLogin}
      handleCloseLoginModal={handleCloseLoginModal}
      // userType={userType}
    />

  </>
    
  );
  
}

  