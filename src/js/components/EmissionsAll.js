import React, { useState, useEffect } from "react";
import { EmissionService } from "../services/emissionService";
import { dataService } from "../services/dataService";
import { Link } from "react-router-dom";
import DefaultImageSrc from '../../../assets/images/bottle1.jpg';

const EmissionsAll = (props) => {
    const [emissionsWithAttributes, setEmissionsWithAttributes] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const [bottleSizes, setBottlesSizes] = useState([]);
    const [bottleCountry, setBottlesCountry] = useState([]);

    const [filterYear, setFilterYear] = useState('');
    const [filterSize, setFilterSize] = useState('');
    const [filterCountry, setFilterCountry] = useState('');
    const [filterRegion, setFilterRegion] = useState('');

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

                // Récupérer uniquement le premier tableau d'attributs
                const firstAttributes = emissions[0].attributes;
                setSelectedOption(firstAttributes);
                // console.log('firstAttributes', firstAttributes)
                
                //Build array bottleSize
                const extractUniqueBottleSizesWithId = (attributes) => {
                    return attributes[17].attribute.options.map(option => ({
                        id: option.id,
                        size: option.searchTerms.split(',')[0]
                    }));
                };
                setBottlesSizes(extractUniqueBottleSizesWithId(firstAttributes));
                
                //Build array Country
                const extractUniqueBottleCountry = (attributes) => {
                    return attributes[19].attribute.options.map(option => ({
                        id: option.id,
                        country: option.searchTerms.split(',')[0]
                    }));
                };
                setBottlesCountry(extractUniqueBottleCountry(firstAttributes))

                //Build array Region
                
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

    const handleYearChange = (e) => {
        setFilterYear(e.target.value);
    };

    const handleSizeChange = (e) => {
        setFilterSize(e.target.value);
        // console.log('search ', e.target.value)
        //Recupère id
        // console.log('search2 ', e.target.selectedOptions[0].id)
    };

    const handleCountryChange = (e) => {
        setFilterCountry(e.target.value);

        console.log('search ', e.target.value)
        //Recupère id
        console.log('search2 ', e.target.selectedOptions[0].id)
    };

    const handleRegionChange = (e) => {
        setFilterRegion(e.target.value);
    };

    // Créer un tableau d'années de 1800 à 2024
    const currentYear = new Date().getFullYear();
    const startYear = 1800; 

    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
        years.push(year);
    }

    // console.log('country ', bottleCountry)
    return (
        <>
            <div className="filter-options ">

            <div className="filter-item">
                <select value={filterYear} onChange={handleYearChange}>
                        <option value="">Filter by year</option>
                    {years.map((year, index) => (
                        <option key={index} value={year}>{year}</option>
                    ))}
                </select>
            </div>
          
            <div className="filter-options">
                <div className="filter-item">
                    <label htmlFor="bottleSize">Bottle Size</label>
                    <select name="bottleSize" className="form-control" defaultValue="" onChange={handleSizeChange}>
                        <option value="">Please choose a bottle size</option>
                        {bottleSizes.map((size) => (
                            <option key={size.id} id={size.id}  value={size.size}>
                                {size.size || "Please choose a bottle size"}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="filter-options">
                <div className="filter-item">
                    <label htmlFor="bottleCountry">Bottle Country</label>
                        <select name="bottleCountry" className="form-control" defaultValue="" onChange={handleCountryChange}>
                        <option value="">Please choose a bottle country</option>
                            {bottleCountry.map((country) => (
                            <option key={country.id} id={country.id}  value={country.country}>
                                {country.country || "Please choose a bottle country"}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

           
            <div className="filter-item">
                <select value={filterRegion} onChange={handleRegionChange}>
                    <option value="">Select Region</option>
                    {/* Add options dynamically based on available regions */}
                    {/* Example: <option value="region1">Region 1</option> */}
                </select>
            </div>
        </div>
        {
            emissionsWithAttributes
                .filter(({ emission }) => emission.publishedForSale)
                .filter(({ attributes }) => {
                    if (filterYear !== '' && attributes[15].value !== filterYear) return false;
                    if (filterSize !== '' && !attributes.some(attr => attr.value === filterSize)) return false;
                    if (filterCountry !== '' && !attributes.some(attr => attr.value === filterCountry)) return false;
                    if (filterRegion !== '' && !attributes.some(attr => attr.value === filterRegion)) return false;
                    return true;
                })
                   
                .map(({ emission, attributes, selectedOptions }) => (
                    <div className="card m-4" style={{ width: "18rem" }} key={emission.id}>
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
            {/* Afficher un message si aucune émission n'est trouvée */}
            {/* {emissionsWithAttributes
                .filter(({ emission }) => emission.publishedForSale)
                .filter(({ attributes }) => {
                    if (filterYear !== '' && attributes[15].value !== filterYear) return false;
                    if (filterSize !== '' && !attributes.some(attr => attr.value === filterSize)) return false;
                    if (filterCountry !== '' && !attributes.some(attr => attr.value === filterCountry)) return false;
                    if (filterRegion !== '' && !attributes.some(attr => attr.value === filterRegion)) return false;
                    return true;
                })
                .length === 0 && <p>Aucune bouteille trouvée</p>
            } */}
        </>
    );
}

export default EmissionsAll;
