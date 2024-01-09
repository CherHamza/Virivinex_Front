import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../../css/Users/ProducerProfil.css';
import EmissionModalCreate from './EmissionModalCreate';

const ProducerProfil = () => {

  const location = useLocation();
  const [profile, setProfile] = useState({});

  const [showModalProducerEmission, setShowModalProducerEmission] = useState(false);
  const handleShowModalProducerEmission = () => setShowModalProducerEmission(true);
  const handleCloseProducerEmissionModal = () => setShowModalProducerEmission(false);


  useEffect(() => {
    if (location.state && location.state.userProfile) {
      setProfile(location.state.userProfile);
      console.log('user', location.state.userProfile); 
    }
  }, [location.state]);
  
  // console.log('user ',  profile);

  const editions = [
    { id: 1, pic: 'image-source', text: 'Texte', owned: 3000, marketPrice: 30.00, value: 90000.00 },
  ];

  const handleCreateEmission = () => {
    console.log('j ai cliquer');
    handleShowModalProducerEmission();
  }

  return (
    <>
    <div className="producer-dashboard"> 
      <div className="profil-view">
        <header>
       
          <h1>Winery: Chateau Laurent </h1>
          <span>Admin:  {profile.firstName} - {profile.lastName}</span>
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
        <button className="configure-button" onClick={handleCreateEmission} >Configure a NEW Emission !</button>
      </div>

    </div>

        <EmissionModalCreate
        handleShowModalProducerEmission={showModalProducerEmission}
        handleCloseModalProducerEmission={handleCloseProducerEmissionModal}
       
      />
    </>
  );

};

export default ProducerProfil;

