import React from "react";
import { useState, useEffect } from "react";
import Image1 from "../../../assets/images/bottle1.jpg";
import { dataService } from "../services/dataService.js";
import { Link } from "react-router-dom";
import { EmissionService } from "../services/emissionService";
import DefaultImageSrc from '../../../assets/images/bottle1.jpg';


const EmissionsAll = (props) => {

    const imageSrc = Image1;
    const [emissionsWithAttributes, setEmissionsWithAttributes] = useState([]);
    const emissionService = EmissionService.getInstance();

    useEffect(() => {
        const fetchAllEmissions = async () => {
            try {
                const allEmissions = await emissionService.getAllEmissions();

                const emissionsPromises = allEmissions.map(async (emission) => {
                    const attributes = await dataService.getAttributeValuesFromSellerSKU(emission.id);
                    const selectedOptions = getSelectedOptions(attributes);

                    return { emission, attributes, selectedOptions };
                });

                const emissions = await Promise.all(emissionsPromises);
                setEmissionsWithAttributes(emissions);
            } catch (error) {
                console.error("Erreur lors de la récupération des émissions :", error);

            }
        };

        fetchAllEmissions();
    }, [])

    const getSelectedOptions = (attributes) => {
        const selectedOptions = attributes.map(attribute => {
            const options = attribute.attribute.options;
            const selectedValue = attribute.value;
            const selectedOption = options.find(option => option.id === selectedValue);
            return selectedOption ? selectedOption.searchTerms : '';
        });
        return selectedOptions;
    };

    // console.log('emissionsWithAttributes + selected', emissionsWithAttributes);

    return (
        <>
        {
            emissionsWithAttributes
                .filter(({ emission }) => emission.publishedForSale)
                .map(({ emission, attributes, selectedOptions }) => (
                    <div className="card m-4" style={{ width: "18rem" }} key={emission.id}>
                        {/* <img src={emission.imageURLs.length > 0 ? emission.imageURLs[0] : DefaultImageSrc} alt={emission.name} title={emission.name} /> */}
                        <img
                            style={{ width: '286px', height: '409px', objectFit: 'cover' }}
                            src={emission.imageURLs.length > 0 ? emission.imageURLs[0] : DefaultImageSrc}
                            alt={emission.name}
                            title={emission.name}
                            onError={(e) => {
                                e.target.src = DefaultImageSrc;
                            }}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{emission.name}</h5>
                            <p className="card-text">{emission.description}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Year : {attributes[15].value ? attributes[15].value : <i>Not specified</i>}</li>
                            <li className="list-group-item">Type : {selectedOptions[21]}</li>
                            <li className="list-group-item">Bottle Size : {selectedOptions[17]}</li>
                            <li className="list-group-item">Country : {selectedOptions[19]}</li>
                            <li className="list-group-item">Region : {selectedOptions[20]}</li>
                            <li className="list-group-item">Id : {emission.id}</li>
                            <li className="list-group-item">Status : {emission.publishedForSale ? 'true' : 'false'}</li>
                        </ul>
                        <div className="card-body">
                            <Link to={`/app/${emission.id}/detail.html`} className="card-link">Detail</Link>
                        </div>
                    </div>
                ))
        }
        </>
    );
}
export default EmissionsAll;