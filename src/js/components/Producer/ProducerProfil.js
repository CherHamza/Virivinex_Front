import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../../css/Users/ProducerProfil.css';
import EmissionModalCreate from './EmissionModalCreate';
import { dataService } from "../../services/dataService";
import Emissions from '../Emissions';

const ProducerProfil = () => {

  const location = useLocation();
  const [profile, setProfile] = useState({});
  const [emissions, setEmissions] = useState([]);

  const [showModalProducerEmission, setShowModalProducerEmission] = useState(false);
  const handleShowModalProducerEmission = () => setShowModalProducerEmission(true);
  const handleCloseProducerEmissionModal = () => setShowModalProducerEmission(false);


  useEffect(() => {
    if (location.state && location.state.userProfile) {
      setProfile(location.state.userProfile);
      console.log('user', location.state.userProfile);
    }
  }, [location.state]);

  // const loggedProfile = dataService.getAuthenticatedProfile();
  // console.log('user ', profile.embeddedParent);
  // console.log('userP ', loggedProfile.embeddedParent);


  const handleCreateEmission = () => {

    handleShowModalProducerEmission();
  }

  return (
    <>
      <div className="producer-dashboard">
        <div className="profil-view">
          <header>
            <h1>Winery: {profile.embeddedParent && profile.embeddedParent.name}</h1>
            <span>Admin:  {profile.firstName} - {profile.lastName}</span>
            <button className="configure-button" onClick={handleCreateEmission} >Configure a NEW Emission !</button>

          </header>

          <Emissions
            results={setEmissions}
            profile={location.state.userProfile.embeddedParent.id}

          />


          <div className="total-value">
            <span>TOTAL VALUE (EUR): 141,984.00</span>
          </div>
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