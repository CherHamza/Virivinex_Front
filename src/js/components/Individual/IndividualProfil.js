import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../../css/Users/IndividualProfil.css'


const IndiviudalProfil = () => {
  const location = useLocation();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    // Mettez à jour le profil avec les données transmises
    if (location.state && location.state.userProfile) {
      setProfile(location.state.userProfile);
      console.log('user', location.state.userProfile);
    }
  }, [location.state]);


  return (
    <div className="profile-container">
      <div className="collection-section">
        <div className="balance-info">
          <p>{profile.firstName}</p>
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
