import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { UserTypeButton } from './UserType';
import Carousel from './Caroussel';
import { dataService } from "../services/dataService";
import { Navigate, useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';
import '../../css/home.css'
import ProducerProfil from './Producer/ProducerProfil';
import {ApiService} from '../services/apiService';

const Home = () => {
  const navigate = useNavigate();
  const apiService = ApiService.getInstance();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await dataService.isAuthenticated();

      if (isAuthenticated) {
        const userProfile = await dataService.getAuthenticatedProfile();
        setProfile(userProfile)
        console.log(userProfile)

        if (userProfile && userProfile.metaInfo && userProfile.metaInfo.userType) {
          switch (userProfile.metaInfo.userType) {
            case "Wine Producer":
              navigate("/app/account/producer.html", { state: { userProfile } });
              break;
            case "Wine Expert":
              navigate("/app/account/expert.html", { state: { userProfile } });
              break;
            case "Individual":
              navigate("/app/account/individual.html", { state: { userProfile } });
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
  }, []);


  useEffect(() => {
    const fetchData = async ()=> {
      const test = await apiService.getSotEmissionAll();
      console.log('Test ', test)

      // console.log('Test id', test[0].uniqueBottle_id)
    }
  
  fetchData();
 
  }, []);


  return (
  <>
    <div className="app">

      <div className="header">
        <h1>Welcome to VERIVINEX!</h1>
        <p>Here you can find, buy and sell premium quality wines produced in limited edition series.</p>
      </div>
      <div className="user-types">
        <UserTypeButton userType="Wine Producer" />
        <UserTypeButton userType="Wine Expert" />
        <UserTypeButton userType="Individual" />
        <UserTypeButton userType="Wine Retailer" />
      </div>
      <Carousel />
    </div>
  </>
  );
};

export default Home;