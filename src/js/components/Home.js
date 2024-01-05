import React, { useEffect } from 'react';
import { Header } from './Header';
import { UserTypeButton } from './UserType';
import Carousel from './Caroussel';
import { dataService } from "../services/dataService";
import { Navigate, useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await dataService.isAuthenticated();

      if (isAuthenticated) {
        const userProfile = await dataService.getAuthenticatedProfile();

        if (userProfile && userProfile.metaInfo && userProfile.metaInfo.userType) {
          switch (userProfile.metaInfo.userType) {
            case "Wine Producer":
              navigate("/app/account/producer.html");
              break;
            case "Wine Expert":
              navigate("/app/account/expert.html");
              break;
            case "Individual":
              navigate("/app/account/individual.html");
              break;
            default:
              toast.error("Type d'utilisateur non reconnu.");
              navigate("/app/home.html");
          }
        } else {
          toast.error("Impossible de récupérer les informations de l'utilisateur.");
        }
      }
    };

    checkAuthentication();
  }, [navigate]);

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