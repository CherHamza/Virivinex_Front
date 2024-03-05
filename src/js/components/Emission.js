import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { dataService } from "../services/dataService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from 'react-router-dom'; // Import useNavigate
import DefaultImageSrc from "../../../assets/images/bottle1.jpg";
import { EmissionService } from "../services/emissionService";
import { ApiService } from "../services/apiService";




const Emission = (props) => {

    const [profile, setProfile] = useState([]);
    const { id } = useParams();
    // const imageSrc = Image1;
    const [emission, setEmission] = useState([]);
    const [bottlesSot, setBottlesSot] = useState([]);
    const [isPublished, setIsPublished] = useState(false);
    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1); // This will navigate back
    };
  const emissionService = EmissionService.getInstance();
  const apiEmission = ApiService.getInstance(); 
  
    
    // useEffect(() => {
    //     const checkAuthentication = async () => {
    //         const isAuthenticated = await dataService.isAuthenticated();

    //         if (isAuthenticated) {
    //             const userProfile = await dataService.getAuthenticatedProfile();
    //             setProfile(userProfile);
    //             // console.log('profile ', userProfile);
    //         } else {
    //             navigate("/app/home.html");
    //         } 
    //     };
    //     checkAuthentication();
    // }, []);
    
    useEffect(() => {
        const fetchEmission = async () => {
            try {
                const emissionId = await emissionService.getEmissionById(id);
                // console.log('emissionId : ', emissionId);

                if (emissionId.length > 0) {
                    console.log('emission: ', emissionId[0]);
                    setEmission(emissionId[0]);
                    setIsPublished(emissionId[0].publishedForSale)
                } else {
                    console.error(`Aucune émission trouvée avec l'ID ${id}`);
                }
            } catch (error) {
                console.error('Error ', error);
            }
        };
        fetchEmission();
    }, [id]);


    useEffect(() => {
        const fetchAllBottlesSot = async () => {
            try {
              const bottlesSotDb = await apiEmission.getBottlesEmissionSot();
              console.log('bottlesSotDb : ', bottlesSotDb);

              // const formattedBottlesSot = bottlesSotDb
              //   .filter(bottle => bottle.emissionId ===  )


            } catch (error) {
                console.error('Error ', error);
            }
        };
      fetchAllBottlesSot();
    }, []);


    return (
        <section className="container mt-5">
          {emission && isPublished ? (
            <div className="row">
              <div className="col-md-6">
                <img
                src={emission.imageURLs.length > 0 ? emission.imageURLs[0] : DefaultImageSrc}
                  alt={emission.name}
                  className="img-fluid rounded shadow-lg"
                  style={{ maxWidth: "100%", maxHeight: "600px" }}
                onError={(e) => {
                  e.target.src = DefaultImageSrc;
                }}
                />
              </div>
              <div className="col-md-6">
                <h2 className="mb-4">Winnery : {emission.embeddedSeller.name}</h2>
                <h3 className="text-primary">{emission.name}</h3>
                <p className="lead">{emission.description}</p>
                <hr className="my-4" />
                <button
              className="btn btn-secondary"
              onClick={handleGoBack}
            >
              Previous Page
            </button>
              </div>
            </div>
          ) : (
            <div className="alert alert-danger mt-3" role="alert">
          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
          Oups ! Une erreur est survenue. Veuillez réessayer.
        </div>
          )}
        </section>
    );
}

export default Emission;