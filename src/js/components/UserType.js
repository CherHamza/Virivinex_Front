import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWineBottle, faGlasses, faUser, faStore } from '@fortawesome/free-solid-svg-icons';
import IndividualModalCreate from './Individual/IndividualModalCreate';
import ExpertModalCreate from './Expert/ExpertModalCreate';
import ProducerModalCreate from './Producer/ProducerModalCreate';
import ModalLogin from './ModalLogin';


const icons = {
  "Wine Producer": faWineBottle,
  "Wine Expert": faGlasses,
  "Individual": faUser,
  "Wine Retailer": faStore,
};

export const UserTypeButton = ({ userType, handleToCreate }) => {
  
  const [selectedUserType, setSelectedUserType] = useState(userType);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);



  const [showModalLogin, setShowModalLogin] = useState(false);
  const handleShowLoginModal = () => setShowModalLogin(true);
  const handleCloseLoginModal = () => setShowModalLogin(false);


  const[showModalExpert, setShowModalExpert] = useState(false);
  const handleShowModalExpert = () => setShowModalExpert(true);
  const handleCloseExpertModal = () => setShowModalExpert(false);


  const[showModalProducer, setShowModalProducer] = useState(false);
  const handleShowModalProducer = () => setShowModalProducer(true);
  const handleCloseProducerModal = () => setShowModalProducer(false);



  const handleClickCreate = (userType) => {
    
    console.log('userType ' + selectedUserType);
    if(selectedUserType === "Individual"){

      handleShowModal();

    }
    if(selectedUserType === "Wine Expert"){

      handleShowModalExpert();
    }

    if (selectedUserType === "Wine Producer"){

      handleShowModalProducer();
    }
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

    <IndividualModalCreate
      handleShowModal={showModal}
      handleCloseModal={handleCloseModal}
      userType={userType}
    />


    

    <ExpertModalCreate
        handleShowModalExpert={showModalExpert}
        handleCloseModalExpert={handleCloseExpertModal}
        userType={userType}
      />

    <ProducerModalCreate
        handleShowModalProducer={showModalProducer}
        handleCloseModalProducer={handleCloseProducerModal}
        userType={userType}
      />

    <ModalLogin
      handleShowLoginModal={showModalLogin}
      handleCloseLoginModal={handleCloseLoginModal}
      userType={userType}
    />
      </>

);
  }