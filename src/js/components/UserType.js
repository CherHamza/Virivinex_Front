import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWineBottle, faGlasses, faUser, faStore } from '@fortawesome/free-solid-svg-icons';
import ModalCreateUser from './ModalCreateUser';
import ModalLogin from './ModalLogin';


const icons = {
  "Wine Producer": faWineBottle,
  "Wine Expert": faGlasses,
  "Individual": faUser,
  "Wine Retailer": faStore,
};

export const UserTypeButton = ({ userType, handleToCreate }) => {
  
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);



  const [showModalLogin, setShowModalLogin] = useState(false);
  const handleShowLoginModal = () => setShowModalLogin(true);
  const handleCloseLoginModal = () => setShowModalLogin(false);



  const handleClickCreate = (userType) => {
    setSelectedUserType(userType);
    handleShowModal();
  };

  const handleLogin = () => {
    console.log('Here handleClickLogin');
    setSelectedUserType(userType);
    handleShowLoginModal();

  };

  return (
      <>
        <div className="user-type">
          <FontAwesomeIcon icon={icons[userType]} size="2x" /> 
          <h2>as a {userType}</h2>
          <div className="user-type-actions">
            <button className="login" onClick={handleLogin}>Login</button>
            <button className="create-account" onClick={handleClickCreate}>Create account</button>
          </div>
        </div>

  <ModalCreateUser
      handleShowModal={showModal}
      handleCloseModal={handleCloseModal}
      userType={userType}
      />


      <ModalLogin
        handleShowLoginModal={showModalLogin}
        handleCloseLoginModal={handleCloseLoginModal}
      />

      </>

);
  }