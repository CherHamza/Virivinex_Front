import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { toast } from 'react-toastify';
import { dataService } from "../../services/dataService";



const EmissionModalCreate = ({ handleShowModalProducerEmission, handleCloseModalProducerEmission,}) => {


    const [formData, setFormData] = useState({
        wineTitleName: "",
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
    });

    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuthenticated = await dataService.isAuthenticated();

            if (isAuthenticated) {
                const userProfile = await dataService.getAuthenticatedProfile();
                setProfile(userProfile)
                // console.log(userProfile)
            }
        };
        checkAuthentication();
    }, []);

    const bottleSizes = ["", "mini 0.5L", "Standard 0.75L", "Magnum 1.5L", "Maxi 6.0L"];
    const countries = ["", "France", "Italy", "Spain", "United States"];
    const regions = ["", "Bordeaux", "Alsace", "Loire", "Savoy","Rhone", "Languedoc-Roussillon", "Provence", "Corsica"];
    const types = ["", "Red", "White", "Rose", "Sparkling White","Sparkling rose"];
    const genres = ["", "Dry", "Semi-dry"];
   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleCreateEmission = async () => {
        /*const newEmission = {
            wineTitleName: formData.nameBottle,
            winery: profile.id,
            grapeComposition: formData.grapeComposition,
            areaOfProduction: formData.areaOfProduction,
            description: formData.description,
            bottleInitialPriceTarget: formData.bottleInitialPriceTarget,
            bottlePriceMinimum: formData.bottlePriceMinimum,
            bottleSize: formData.bottleSize,
            country: formData.country,
            wineMacroRegion: formData.wineMacroRegion,
            typeOfWine: formData.typeOfWine,
            dryToSweetType: formData.dryToSweetType,
        };*/
        const loggedProfile = await dataService.getAuthenticatedProfile();

        const newEmission = {
            name: "000123",
            embeddedSeller: loggedProfile.embeddedParent,
            embeddedSku : {
                _id: "00000000001",
                name: "Emission Red Standard 0.75",
                repositoryName: "SKURepository"
            }

        };
        console.log('emission ' , newEmission);

        dataService.saveEmissionAsDraft(newEmission).then(res => console.log(res));

        // Reset fields and close modal
        setFormData({
            wineTitleName: "",
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
        });

        handleCloseModalProducerEmission();

    };

    return (
        <div className={`modal fade ${handleShowModalProducerEmission ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: handleShowModalProducerEmission ? "block" : "none", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content border-0 shadow">
                    <div className="modal-header" style={{ backgroundColor: "#4B2E83", color: "#FFF" }}>
                        <h5 className="modal-title mx-auto">Create Emission</h5>
                        <button type="button" className="close btn btn-danger" onClick={handleCloseModalProducerEmission}>
                            <span aria-hidden="true" style={{ color: "#FFF" }}>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{ backgroundColor: "#F2F2F2" }}>
                        <div className="form-group">
                            <label htmlFor="wineTitleName">Wine Title Name</label>
                            <input type="text" className="form-control" id="wineTitleName" name="wineTitleName" value={formData.nameBottle} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="grapeComposition">Grape Composition</label>
                            <input type="text" className="form-control" id="grapeComposition" name="grapeComposition" value={formData.grapeComposition} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="areaOfProduction">Area of Production</label>
                            <input type="text" className="form-control" id="areaOfProduction" name="areaOfProduction" value={formData.areaOfProduction} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleInputChange} />
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
                        </div>
                    </div>
                    <div className="modal-footer" style={{ backgroundColor: "#F2F2F2" }}>
                        <button type="button" className="btn" style={{ backgroundColor: "#4B2E83", color: "#FFF" }} onClick={handleCreateEmission}>
                            Create
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModalProducerEmission}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmissionModalCreate;