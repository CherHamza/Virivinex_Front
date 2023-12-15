import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWineBottle, faGlasses, faUser, faStore } from '@fortawesome/free-solid-svg-icons';

const icons = {
  "Wine Producer": faWineBottle,
  "Wine Expert": faGlasses,
  "Individual": faUser,
  "Wine Retailer": faStore,
};

export const UserTypeButton = ({ userType }) => (
  <div className="user-type">
    <FontAwesomeIcon icon={icons[userType]} size="2x" /> 
    <h2>as a {userType}</h2>
    <div className="user-type-actions">
      <button className="login">Login</button>
      <button className="create-account">Create account</button>
    </div>
  </div>
);
