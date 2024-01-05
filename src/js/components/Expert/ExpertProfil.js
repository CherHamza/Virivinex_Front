import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../../css/Users/ExpertProfil.css'


const ExpertProfil = () => {
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
        <>

    <div className="expert-profile">
      <header className="expert-header">
        <div className="expert-info">
            <span className="expert-username">{profile.firstName}</span>
          <span>Representing: -</span>
        </div>
        <div className="expert-settings">
          <button>My evaluations</button>
          <button>Settings</button>
        </div>
      </header>
      
      <div className="emissions-awaiting">
        <h2>All NEW Limited Edition Emissions awaiting evaluation: 67</h2>
        <div className="emissions-sorting">
          <select name="sort" id="sort-emissions">
            <option value="attribute-preference">Sort by attribute-preference</option>
          </select>
          <button>Filter set</button>
        </div>
        <button className="more-emissions">More ...</button>
      </div>

      <div className="emissions-participation">
        <button>Request to participate in evaluation of marked Emissions</button>
      </div>

      <div className="emissions-notification">
        <button>Get notification when a new Emission appears</button>
      </div>

      <div className="search-emissions">
        <input type="search" placeholder="what would you like to find?" />
        <button>Search</button>
      </div>

    </div>
  
            
        </>

    );
}

export default ExpertProfil;