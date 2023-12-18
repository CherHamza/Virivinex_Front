import React from 'react';
import { Header } from './Header';
import { UserTypeButton } from './UserType';
import Carousel from './Caroussel';
import "../../css/home.css";
import ModalLogin from './ModalLogin';
import ModalCreateUser from './ModalCreateUser';

const Home = () => {

  const handleCreateUser = (userType) => {
    console.log(`Hello, as a ${userType}!`);
  };


  return (

  <>
    <div className="app">
      <Header />
      <div className="user-types">
        <UserTypeButton userType="Wine Producer"
          handleToCreate={handleCreateUser} />
        <UserTypeButton userType="Wine Expert"  handleToCreate={handleCreateUser} />
        <UserTypeButton userType="Individual"  handleToCreate={handleCreateUser} />
        <UserTypeButton userType="Wine Retailer"  handleToCreate={handleCreateUser} />
        
      </div>
      <Carousel />
    </div>




  </>

  );


};

export default Home;