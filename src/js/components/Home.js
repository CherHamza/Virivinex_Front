import React from 'react';
import { Header } from './Header';
import { UserTypeButton } from './UserType';
import Carousel from './Caroussel';
import "../../css/home.css";
import { dataService } from "../services/dataService";


const Home = () => {

  const handleCreateUser = (userType) => {
    console.log(`Hello, as a ${userType}!`);
  };

  // const app = new MSM2.App();

  // let sr = {
  //   query: {},
  //   visiblePages: 10,
  //   page: 1,
  //   limit: 10
  // }


  // app.invokeAndGetJson$("ecomSearchEngineServiceImpl ", "PROTOTYPE", "searchSellersResults", [sr]).subscribe(res => console.log(res));

  // let sr = {
  //   query: {},
  //   visiblePages: 10,
  //   page: 1,
  //   limit: 10
  // }

  // let data =  dataService.getUsers(sr).then(res => console.log(res));

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