import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { toast } from 'react-toastify';
import { dataService } from "../../services/dataService";
import SearchSkus from "../SearchSkus";
import { ApiService } from '../../services/apiService';
import { EmissionService } from "../../services/emissionService";


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
      bottleSizes: "",
      country: "",
      wineMacroRegion: "",
      typeOfWine: "",
      nbOfUnits: "",
      dryToSweetType: "",
      searchCategory: "",
      
     

    });
  
    const [profile, setProfile] = useState([]);
    const [embeddedSkuId, setEmbeddedSkuId] = useState([]);
    const [embeddedSkuName, setEmbeddedName] = useState([]);
    const apiService = ApiService.getInstance();
    const emissionService = EmissionService.getInstance();
 
  
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

    useEffect(() => {
      if (resetFields) { 
        setFormData({
          nameEmission: "",
          grapeComposition: "",
          areaOfProduction: "",
          description: "",
          bottleInitialPriceTarget: "",
          bottlePriceMinimum: "",
          bottleSizes: "",
          country: "",
          searchCategory: "",
          wineMacroRegion: "",
          typeOfWine: "",
          nbOfUnits: "",
          dryToSweetType: "",
        });
  
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
        const allAvailableAttrs = await dataService.getAttributesFromSKU(embeddedSkuId);

        const newEmission = {
          name: formData.nameEmission,
          description: formData.description,
          embeddedSeller: loggedProfile.embeddedParent,
          attributeValues : [
              { attribute: { id: "Type of Wine" }, value: "opt15", active: true },
          ],
          embeddedSku: {
            id: embeddedSkuId,
            name: embeddedSkuName,
            repositoryName: "SKURepository",
          },
          metaInfo:{
            publishedSot: false,
         }
        };
     
     
        try {
        const response = await dataService.saveEmissionAsDraft(newEmission);

        const loggedProfile = await dataService.getAuthenticatedProfile();
        const emailData = {
            email: loggedProfile.emailAddress,
            name: `${loggedProfile.firstName} ${loggedProfile.lastName}`,
            phone: loggedProfile.mobilePhone,
            desc: `A new emission "${formData.nameEmission}" has been created.`,
            topic: `New Emission Created by ${loggedProfile.embeddedParent.name}`,
            isPathAbsolute: false,
            attachments: []
        };

        const emailResponse = await emissionService.sendEmailToAdmin(emailData);

        const emailDataWinery = {
          email: loggedProfile.emailAddress, 
          name: `${loggedProfile.firstName} ${loggedProfile.lastName}`,
          desc: `A new emission "${formData.nameEmission}" has been created.`,
          topic: `New Emission Created by ${loggedProfile.embeddedParent.name}`,
          isPathAbsolute: false,
          attachments: []
      };

      const emailResponseWinery = await emissionService.sendSimpleEmail(emailDataWinery);

         

          const productAttrs = await dataService.getProductRelatedData(response.id);
          const attrValues = response.attributeValues;

          toast.success("Emission created successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
     
          setResetFields(true);
     
          handleCloseModalProducerEmission();
        } catch (error) {
          console.error("Error creating emission:", error);
     
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

  
              <SearchSkus setSkuId={setEmbeddedSkuId} setSkuName={setEmbeddedName} />

              <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea className="form-control" rows="5" calls="33" id="description" name="description" value={formData.description} onChange={handleInputChange}></textarea>
              </div>

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
      </div>
    );
  };
  
  export default EmissionModalCreate;
