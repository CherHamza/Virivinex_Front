import React from 'react';
import { Header } from './Header';
import { UserTypeButton } from './UserType';
import Carousel from './Caroussel';
import "../../css/home.css";

const Home = () => {
  return (
    <div className="app">
      <Header />
      <div className="user-types">
        <UserTypeButton userType="Wine Producer" />
        <UserTypeButton userType="Wine Expert" />
        <UserTypeButton userType="Individual" />
        <UserTypeButton userType="Wine Retailer" />
      </div>
      <Carousel />
    </div>
  );
};

export default Home;