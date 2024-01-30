import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../../css/Users/IndividualProfil.css'
import DisplayEmissionSearch from '../DisplayEmissionSearch';
import EmissionsAll from '../EmissionsAll';
import SearchEmission from '../SearchEmission';


const IndiviudalProfil = () => {
  const location = useLocation();
  const [profile, setProfile] = useState({});
  const [displayEmission, setDisplayEmission] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Mettez à jour le profil avec les données transmises
    if (location.state && location.state.userProfile) {
      setProfile(location.state.userProfile);
      // console.log('user', location.state.userProfile);
    }
  }, []);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  // console.log('indi', searchResults)
  return (
    <>
    <div className="profile-container">
      <div className="collection-section">
        <div className="balance-info">
          <p>{profile.firstName} - {profile.lastName}</p>
          <p>Cash balance: <span>100,00 EUR</span></p>
        </div>
        <div className="wine-collection-info">
          <p>Total value: <span>100,00 EUR</span></p>
          <p>You have no wine in your collection yet. Start forming your collection!</p>
        </div>
      </div>
      <div className="search-section">

        <div className="search-by-criteria">
            <SearchEmission onSearch={handleSearch} />
        </div>

      </div>

        <section className='d-flex justify-content-center flex-wrap'>
          {searchResults.length > 0 ? (
            <DisplayEmissionSearch emissions={searchResults} />
          ) : (
            <EmissionsAll emissions={setDisplayEmission} />
          )}
        
        </section>
    </div>

</>
  );
};

export default IndiviudalProfil;
