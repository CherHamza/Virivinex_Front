import React from 'react';

export const UserTypeButton = ({ userType }) => (
    <div className="user-type">
      <h2>as a {userType}</h2>
      <div className="user-type-actions">
        <button className="login">Login</button>
        <button className="create-account">Create account</button>
      </div>
    </div>
  );