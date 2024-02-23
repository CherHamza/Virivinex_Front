import React, { useEffect, useState } from 'react';
import DisplayEmissionSearch from './DisplayEmissionSearch'; 
import SearchEmission from './SearchEmission'; 
import { EmissionService } from '../services/emissionService';

const AllEmissionsPage = () => {
  const [emissions, setEmissions] = useState([]); 
  const [searchResults, setSearchResults] = useState([]); 

  useEffect(() => {
    const fetchAllEmissions = async () => {
      try {
        const emissionService = EmissionService.getInstance();
        const allEmissions = await emissionService.getAllEmissions();

        setEmissions(allEmissions);
      } catch (error) {
        console.error('Erreur lors de la récupération des émissions :', error);
      }
    };

    fetchAllEmissions();
  }, []);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const splitEmissionsIntoRows = (emissions) => {
    const rows = [];
    for (let i = 0; i < emissions.length; i += 4) {
      rows.push(emissions.slice(i, i + 4));
    }
    return rows;
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Toutes les émissions</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-lg-6">
          {/* Composant de recherche d'émissions */}
          <SearchEmission onSearch={handleSearch} />
        </div>
      </div>
      <div className=" d-flex justify-content-center flex-wrap">
          {/* Affichage des émissions en fonction des résultats de recherche */}
          {splitEmissionsIntoRows(searchResults.length > 0 ? searchResults : emissions).map((row, index) => (
            <div key={index} className=" mb-4">
              {row.map((emission) => (
                <div key={emission.id} className="">
                  <DisplayEmissionSearch emissions={[emission]} />
                </div>
              ))}
            </div>
          ))}
        
      </div>
    </div>
  );
};

export default AllEmissionsPage;
