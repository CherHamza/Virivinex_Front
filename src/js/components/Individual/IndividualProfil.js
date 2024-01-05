// UserProfile.js
import React from 'react';
import '../../../css/Users/IndividualProfil.css'

const IndiviudalProfil = () => {
  const handleLogout = () => {
    if (dataService.isAuthenticated()) {
      // setIsAuthenticated(false);
      // console.log(isAuthenticated)
      userService.logout()
      navigate("/app/home.html");

    }
  }
  return (
    <div className="profile-container">
      <div className="collection-section">
        <div className="balance-info">
        <a className="btn btn-primary" onClick={handleLogout}>Logout </a>
          <p>Cash balance: <span>100,00 EUR</span></p>
        </div>
        <div className="wine-collection-info">
          <p>Total value: <span>100,00 EUR</span></p>
          <p>You have no wine in your collection yet. Start forming your collection!</p>
        </div>
      </div>
      <div className="search-section">
        <div className="search-by-criteria">
          <input type="text" placeholder="type key words" />
          <button>Filter set</button>
          <button>Search</button>
        </div>
        <div className="browse-section">
          <button>Request a personalized recommendation</button>
        </div>
      </div>
      <div className="featured-wines-section">
      
      </div>
    </div>
  );
};

export default IndiviudalProfil;
