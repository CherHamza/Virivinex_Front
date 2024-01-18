import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { toast } from 'react-toastify';
import { dataService } from "../../services/dataService";
import Search from "../Search";



const EmissionModalCreate = ({ handleShowModalProducerEmission, handleCloseModalProducerEmission }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resetFields, setResetFields] = useState(false);
    const [formData, setFormData] = useState({
      nameEmission: "",
      grapeComposition: "",
      areaOfProduction: "",
      description: "",
      bottleInitialPriceTarget: "",
      bottlePriceMinimum: "",
      bottleSize: "",
      country: "",
      wineMacroRegion: "",
      typeOfWine: "",
      dryToSweetType: "",
      searchCategory: "",
    });
  
    const [profile, setProfile] = useState([]);
    const [embeddedSkuId, setEmbeddedSkuId] = useState([]);
    const [embeddedSkuName, setEmbeddedName] = useState([]);
  
    useEffect(() => {
      const checkAuthentication = async () => {
        const isAuthenticated = await dataService.isAuthenticated();
  
        if (isAuthenticated) {
          const userProfile = await dataService.getAuthenticatedProfile();
          setProfile(userProfile);
        }
      };
      checkAuthentication();
    }, []);
  
    // Effet pour réinitialiser les champs lorsque resetFields change
    useEffect(() => {
      if (resetFields) {
        setFormData({
          nameEmission: "",
          grapeComposition: "",
          areaOfProduction: "",
          description: "",
          bottleInitialPriceTarget: "",
          bottlePriceMinimum: "",
          bottleSize: "",
          country: "",
          searchCategory: "",
          wineMacroRegion: "",
          typeOfWine: "",
          dryToSweetType: "",
        });
  
        // Réinitialiser resetFields
        setResetFields(true);
      }
    }, [resetFields]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    const handleCreateEmission = async () => {
        const loggedProfile = await dataService.getAuthenticatedProfile();
     
        const newEmission = {
          name: formData.nameEmission,
          embeddedSeller: loggedProfile.embeddedParent,
          embeddedSku: {
            id: embeddedSkuId,
            name: embeddedSkuName,
            repositoryName: "SKURepository",
          },
        };
     
        console.log("emission ", newEmission);
     
        try {
          const response = await dataService.saveEmissionAsDraft(newEmission);
          console.log(response);
     
          // Afficher un toast de succès
          toast.success("Emission created successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
     
          // Déclencher la réinitialisation des champs en changeant la valeur de resetFields
          setResetFields(true);
     
          handleCloseModalProducerEmission();
        } catch (error) {
          console.error("Error creating emission:", error);
     
          // Afficher un toast d'erreur
          toast.error("Failed to create emission. Please try again.", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      };
     
  
    return (
      <div
        className={`modal fade ${handleShowModalProducerEmission ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: handleShowModalProducerEmission ? "block" : "none", backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0 shadow">
            <div className="modal-header" style={{ backgroundColor: "#4B2E83", color: "#FFF" }}>
              <h5 className="modal-title mx-auto">Create Emission</h5>
              <button
                type="button"
                className="close btn btn-danger"
                onClick={() => {
                  setIsModalOpen(false);
                  handleCloseModalProducerEmission();
                }}
              >
                <span aria-hidden="true" style={{ color: "#FFF" }}>
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body" style={{ backgroundColor: "#F2F2F2" }}>
              <div className="form-group">
                <label htmlFor="nameEmission">Wine Title Name</label>
                <input type="text" className="form-control" id="nameEmission" name="nameEmission" value={formData.nameEmission} onChange={handleInputChange} />
              </div>
  
              <Search setSkuId={setEmbeddedSkuId} setSkuName={setEmbeddedName} />
  
            </div>
            <div className="modal-footer" style={{ backgroundColor: "#F2F2F2" }}>
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#4B2E83", color: "#FFF" }}
                onClick={handleCreateEmission}
              >
                Create
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setIsModalOpen(false);
                  handleCloseModalProducerEmission();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        {/* <ToastContainer autoClose={3000} /> */}
      </div>
    );
  };
  
  export default EmissionModalCreate;
