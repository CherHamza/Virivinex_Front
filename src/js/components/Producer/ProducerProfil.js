import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../../css/Users/ProducerProfil.css';

const ProducerProfil = () => {
  const location = useLocation();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    // Mettez à jour le profil avec les données transmises
    if (location.state && location.state.userProfile) {
      setProfile(location.state.userProfile);
      console.log('user', location.state.userProfile); 
    }
  }, [location.state]);


  const editions = [
    { id: 1, pic: 'image-source', text: 'Texte', owned: 3000, marketPrice: 30.00, value: 90000.00 },

  ];

  return (
    <div className="producer-dashboard">
      <div className="profil-view">
        <header>
       
          <h1>Winery: Chateau Laurent</h1>
          <span>Admin:  {profile.firstName}</span>
        </header>
        <div className="editions-list">
          {editions.map(edition => (
            <div className="edition-item" key={edition.id}>
              <div className="edition-image">
                <img src={edition.pic} alt="Wine edition" />
              </div>
              <div className="edition-details">
                <span>{edition.text}</span>
                <span>{edition.owned} bottles</span>
                <span>€{edition.marketPrice} market price</span>
                <span>€{edition.value} value</span>
              </div>
            </div>
          ))}
        </div>
        <div className="total-value">
          <span>TOTAL VALUE (EUR): 141,984.00</span>
        </div>
        <button className="configure-button">Configure a NEW Limited Edition Emission !</button>
      </div>

    </div>
  );
};

export default ProducerProfil;

