import React, { useState, useEffect } from "react";
import { EmissionService } from "../services/emissionService";
import { ApiService } from "../services/apiService";
import { dataService } from "../services/dataService";
import { Link } from "react-router-dom";
import DefaultImageSrc from '../../../assets/images/bottle1.jpg';

const EmissionsAll = (props) => {
    const [emissionsWithAttributes, setEmissionsWithAttributes] = useState([]);
    const [bottleSizes, setBottlesSizes] = useState([]);
    const [bottleCountry, setBottlesCountry] = useState([]);
    const [bottleRegion, setBottlesRegion] = useState([]);

    const [filterYear, setFilterYear] = useState('');
    const [filterSize, setFilterSize] = useState('');
    const [filterCountry, setFilterCountry] = useState('');
    const [filterRegion, setFilterRegion] = useState('');
    const emissionService = EmissionService.getInstance();
    const apiService = ApiService.getInstance();

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

                const firstAttributes = emissions[0].attributes;
                setBottlesSizes(extractUniqueBottleSizesWithId(firstAttributes));
                setBottlesCountry(extractUniqueBottleCountry(firstAttributes));
                setBottlesRegion(extractUniqueBottleRegion(firstAttributes));
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
            return selectedOption ? selectedOption.searchTerms.split(',')[0] : '';
        });
        return selectedOptions;
    };

    const handleYearChange = (e) => {
        setFilterYear(e.target.value);
    };

    const handleSizeChange = (e) => {
        setFilterSize(e.target.value);
    };

    const handleCountryChange = (e) => {
        setFilterCountry(e.target.value);
    };

    const handleRegionChange = (e) => {
        setFilterRegion(e.target.value);
    };

    const extractUniqueBottleSizesWithId = (attributes) => {
        return attributes[17].attribute.options.map(option => ({
            id: option.id,
            size: option.searchTerms.split(',')[0]
        }));
    };

    const extractUniqueBottleCountry = (attributes) => {
        return attributes[19].attribute.options.map(option => ({
            id: option.id,
            country: option.searchTerms.split(',')[0]
        }));
    };

    const extractUniqueBottleRegion = (attributes) => {
        return attributes[20].attribute.options.map(option => ({
            id: option.id,
            region: option.searchTerms.split(',')[0]
        }));
    };

    const currentYear = new Date().getFullYear();
    const startYear = 1800;

    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
        years.push(year);
    }
    console.log('emissionMSM', emissionsWithAttributes.filter(({ emission }) => emission.publishedForSale))
    useEffect(() => {
        const fetchEmission = async () => {
            try {
                const emissionsSOT = await apiService.getSotEmissionAll()
                console.log('emissionsAll ', emissionsSOT)
            } catch (error) {
                console.error("Erreur lors de la récupération des émissions :", error);
            }
        };

        fetchEmission();
    }, [])

    // https://verivinex.com/sot/emissions/Numero99/sellerSku29_65e0a49127500d016bfb690b
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <div className="filter-options">
                        <h4>Filters</h4>
                        <div className="filter-item">
                            <select className="form-select" value={filterYear} onChange={handleYearChange}>
                                <option value="">Filter by year</option>
                                {years.map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-item">
                            <select className="form-select" value={filterSize} onChange={handleSizeChange}>
                                <option value="">Please choose a bottle size</option>
                                {bottleSizes.map((size, index) => (
                                    <option key={index} value={size.size}>
                                        {size.size}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-item">
                            <select className="form-select" value={filterCountry} onChange={handleCountryChange}>
                                <option value="">Please choose a bottle country</option>
                                {bottleCountry.map((country, index) => (
                                    <option key={index} value={country.country}>
                                        {country.country || "Please choose a bottle country"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-item">
                            <select className="form-select" value={filterRegion} onChange={handleRegionChange}>
                                <option value="">Select Region</option>
                                {bottleRegion.map((region, index) => (
                                    <option key={index} value={region.region}>
                                        {region.region || "Please choose a region"}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {emissionsWithAttributes
                            .filter(({ emission }) => emission.publishedForSale)
                            .filter(({ attributes, selectedOptions }) => {
                                if (filterYear !== '' && attributes[15].value !== filterYear) return false;
                                if (filterSize !== '' && selectedOptions[17] !== filterSize) return false;
                                if (filterCountry !== '' && selectedOptions[19] !== filterCountry) return false;
                                if (filterRegion !== '' && selectedOptions[20] !== filterRegion) return false;
                                return true;
                            })
                            .map(({ emission, attributes, selectedOptions }) => (
                                <div className="col" key={emission.id}>
                                    <div className="card">
                                        <img
                                            src={emission.imageURLs.length > 0 ? emission.imageURLs[0] : DefaultImageSrc}
                                            className="card-img-top"
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
                                            <Link to={`/app/sot/emissions/${emission.name}/${emission.id}/detail.html`} className="card-link">Detail</Link>
                                            {/* https://verivinex.com/sot/emissions/Numero99/sellerSku29_65e0a49127500d016bfb690b */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmissionsAll;

