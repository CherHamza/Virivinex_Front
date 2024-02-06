import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { toast } from 'react-toastify';
import { dataService } from "../../services/dataService";
import SearchSkus from "../SearchSkus";
import { ApiService } from '../../services/apiService';



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
  // const [data, setData] = useState(null);
  // const [newEmission, setNewEmission] = useState({
  //   nameEmission: "",
  //   description: "",
  // })
  
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

    const bottleSizes = ["", "mini 0.5L", "Standard 0.75L", "Magnum 1.5L", "Maxi 6.0L"];
    const countries = ["", "France", "Italy", "Spain", "United States"];
    const regions = ["", "Bordeaux", "Alsace", "Loire", "Savoy","Rhone", "Languedoc-Roussillon", "Provence", "Corsica"];
    // const types = ["", "Red", "White", "Rose", "Sparkling White","Sparkling rose"];
    // const genres = ["", "Dry", "Semi-dry"];

    
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
          bottleSizes: "",
          country: "",
          searchCategory: "",
          wineMacroRegion: "",
          typeOfWine: "",
          nbOfUnits: "",
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
        const allAvailableAttrs = await dataService.getAttributesFromSKU(embeddedSkuId);

        // console.log("all available attributes:",allAvailableAttrs);

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
        };
     
        // console.log("emission ", newEmission);

      const newEmissionApi = {
        emissionUnique_id: "",
        wineTitleName: formData.nameEmission,
        emissionCardLink: "",
        winery: loggedProfile && loggedProfile.embeddedParent ? loggedProfile.embeddedParent.name : null,
        areaOfProduction: "",
        wineMacroRegion: formData.regions,
        country: formData.countries,
        yearOfBottling: "",
        typeOfWine: "",
        initialQuantityoOfUniqueBottlesInEmission: formData.nbOfUnits,
        bottleSize_TradingUnitType: formData.bottleSizes,
        emissionRecordReference: "",
        ledgerOfEmissionVideoRecording: "",
        uniquenessFactorType: "",
        uniquenessFactorDescription: formData.description,
        emissionStatus: "",
        ledgersOfEmissionVideoRecording: "",
        wineDescriptiveCombination: ""

      };
      // console.log("newEmissionAPi", newEmissionApi);


        
     
        try {
          // Creation emission CMS
          const response = await dataService.saveEmissionAsDraft(newEmission);
          console.log('Creation CMS',response);

          // Creation emission SOT
        const apiEmission = await apiService.setSotEmission(newEmissionApi);
          console.log("Creation SOT", apiEmission);

          // Dernier enregistrement in SOT
          const lastRecordEmission = await apiService.getLastRecord();
          console.log('Last record ', lastRecordEmission._id);

          const oidValue = lastRecordEmission._id["$oid"]; 

          const idEmissionCMS = response.id;

          
          const concatenatedId = idEmissionCMS + '_'+ oidValue;
          console.log('concatenation ', concatenatedId);

          // Update field 
          const newEmissionId = await apiService.updateEmissionId(oidValue, concatenatedId)


          const productAttrs = await dataService.getProductRelatedData(response.id);
          // console.log("product related attributes:",productAttrs);
          const attrValues = response.attributeValues;
          // console.log("only defined attribute values:",attrValues);

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
     

  

  // fetchApi();
  
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

              <div className="form-group">
                            <label htmlFor="wineMacroRegion">Wine Macro Region</label>
                            <select name="wineMacroRegion" className="form-control" defaultValue="" onChange={handleInputChange}>
                                {regions.map((region) => (
                                    <option key={region} value={region}>
                                        {region || "Please choose a region"}
                                    </option>
                                ))}
                            </select>
              </div>
              <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <select name="country" className="form-control" defaultValue="" onChange={handleInputChange}>
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country || "Please choose a country"}
                                    </option>
                                ))}
                            </select>
              </div>
              <div className="form-group">
                  <label htmlFor="nbOfUnits"> Quantity Of Unique Bottles In Emission</label>
                <input type="number" className="form-control" id="nbOfUnits" name="nbOfUnits" value={formData.nbOfUnits} onChange={handleInputChange} />
              </div>

              <div className="form-group">
                            <label htmlFor="bottleSize">Bottle Size</label>
                            <select name="bottleSize" className="form-control" defaultValue="" onChange={handleInputChange}>
                                {bottleSizes.map((size) => (
                                    <option key={size} value={size}>
                                        {size || "Please choose a bottle size"}
                                    </option>
                                ))}
                            </select>
              </div>


             {/* <div className="form-group">
                            <label htmlFor="searchCategory">Type Of Wine</label>
                            <input type="search" className="form-control" id="searchCategory" name="searchCategory" value={formData.searchCategory} onChange={handleInputChange} />
                            <button type="button" className="btn btn-primary" onClick={handleSearch}>
                                Search
                            </button>
                            {/* Affichez les SKU filtrés 
                            {Array.isArray(filteredSkus) && filteredSkus.map((sku) => (
                                <div key={sku.id}>{sku.name}</div>
                            ))} 
                            <select name="searchCategory" className="form-control" value={formData.searchCategory} onChange={handleInputChange}>
                                <option value="">Choose a search term...</option>
                                {uniqueSearchTerms.map((term, index) => (
                                    <option key={index} value={term}>
                                        {term}
                                    </option>
                                ))}
                            </select>

                        </div>  */}
                        {/* <div className="form-group">
                            <label htmlFor="grapeComposition">Grape Composition</label>
                            <input type="text" className="form-control" id="grapeComposition" name="grapeComposition" value={formData.grapeComposition} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="areaOfProduction">Area of Production</label>
                            <input type="text" className="form-control" id="areaOfProduction" name="areaOfProduction" value={formData.areaOfProduction} onChange={handleInputChange} />
                        </div>
                        

                        <div className="form-group">
                            <label htmlFor="bottleInitialPriceTarget">Bottle Initial Price Target</label>
                            <input type="number" className="form-control" id="bottleInitialPriceTarget" name="bottleInitialPriceTarget" value={formData.bottleInitialPriceTarget} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bottlePriceMinimum">Bottle  Price Minimum</label>
                            <input type="number" className="form-control" id="bottlePriceMinimum" name="bottlePriceMinimum" value={formData.bottlePriceMinimum} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bottleSize">Bottle Size</label>
                            <select name="bottleSize" className="form-control" defaultValue="" onChange={handleInputChange}>
                                {bottleSizes.map((size) => (
                                    <option key={size} value={size}>
                                        {size || "Please choose a bottle size"}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <select name="country" className="form-control" defaultValue="" onChange={handleInputChange}>
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country || "Please choose a country"}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="wineMacroRegion">Wine Macro Region</label>
                            <select name="wineMacroRegion" className="form-control" defaultValue="" onChange={handleInputChange}>
                                {regions.map((region) => (
                                    <option key={region} value={region}>
                                        {region || "Please choose a region"}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="typeOfWine">Type of Wine</label>
                            <select name="typeOfWine" className="form-control" defaultValue="" onChange={handleInputChange}>
                                {types.map((type) => (
                                    <option key={type} value={type}>
                                        {type || "Please choose a Type of Wine"}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dryToSweetType">Dry to Sweet Type</label>
                            <select name="dryToSweetType" className="form-control" defaultValue="" onChange={handleInputChange}>
                                {genres.map((genre) => (
                                    <option key={genre} value={genre}>
                                        {genre || "Please choose a Dry to Sweet Type"}
                                    </option>
                                ))}
                            </select>
                        </div> */}       
                    
                    
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
