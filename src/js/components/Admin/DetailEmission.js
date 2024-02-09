import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { dataService } from "../../services/dataService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from 'react-router-dom'; // Import useNavigate
// import Image1 from "../../../assets/images/bottle1.jpg";
import { EmissionService } from "../../services/emissionService";
import { ApiService } from "../../services/apiService";




const DetailEmission = (props) => {

    const [profile, setProfile] = useState([]);
    const { id } = useParams();
  
    const [emission, setEmission] = useState([]);
    const [isPublished, setIsPublished] = useState(false);
    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1); // This will navigate back
    };
    const emissionService = EmissionService.getInstance(); 
    const apiService = ApiService.getInstance();



    const  handleCreateSotEmission = async()=>{

        const newEmissionApi = {
            emissionUnique_id: "",
            wineTitleName: emission.name,
            emissionCardLink: "",
            winery: emission.embeddedSeller.name,
            areaOfProduction: "",
            wineMacroRegion: "",
            country: "",
            yearOfBottling: "",
            typeOfWine: "",
            initialQuantityoOfUniqueBottlesInEmission: "",
            bottleSize_TradingUnitType: "",
            emissionRecordReference: "",
            ledgerOfEmissionVideoRecording: "",
            uniquenessFactorType: "",
            uniquenessFactorDescription: emission.description,
            emissionStatus: "",
            ledgersOfEmissionVideoRecording: "",
            wineDescriptiveCombination: ""
    
          };
          console.log("newEmissionAPi", newEmissionApi);

        
        try {
            
              // Creation emission SOT
          const apiEmission = await apiService.setSotEmission(newEmissionApi);
          console.log("Creation SOT", apiEmission);



          
          const  updateEmission = {
            id : id,
            metaInfo : {
              isPublishedSot: true,
              repositoryName: "SellerSKURepository"
            }
          }


          const updateCms = await dataService.saveEmissionAsDraft(updateEmission)
          // setEmission(updateCms)
          // console.log("request:", updateCms);

          // Dernier enregistrement in SOT
        //   const lastRecordEmission = await apiService.getLastRecord();
        //   console.log('Last record ', lastRecordEmission._id);

        //   const oidValue = lastRecordEmission._id["$oid"]; 

        //   const idEmissionCMS = response.id;

          
        //   const concatenatedId = idEmissionCMS + '_'+ oidValue;
        //   console.log('concatenation ', concatenatedId);

          // Update field 
        //   const newEmissionId = await apiService.updateEmissionId(oidValue, concatenatedId)

    
        } catch (error) {
            console.log('ERROR', error)
          
        }

    }

    
    
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
                console.log('emissionId : ', emissionId);

                if (emissionId.length > 0) {
                  console.log('emission: ', emissionId[0].metaInfo.isPublishedSot);
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


    return (
        <section className="container mt-5">
          {emission && isPublished ? (
            <div className="row">
              <div className="col-md-6">
                {/* <img
                  src={imageSrc}
                  alt={emission.name}
                  className="img-fluid rounded shadow-lg"
                  style={{ maxWidth: "100%", maxHeight: "600px" }}
                /> */}
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
                <button
              className="btn btn-warning"
              onClick={handleCreateSotEmission}
            >
              Send to SOT
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

export default DetailEmission;