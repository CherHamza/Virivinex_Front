import React, { useEffect, useState } from 'react';
import DisplayEmissionSearch from './DisplayEmissionSearch';
import SearchEmission from './SearchEmission';
import { EmissionService } from '../services/emissionService';
import EmissionsAll from './EmissionsAll';

const AllEmissionsPage = () => {
  const [emissions, setEmissions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchAllEmissions = async () => {
      try {
        const emissionService = EmissionService.getInstance();
        const allEmissions = await emissionService.getAllEmissions();
      } catch (error) {
        console.error('Error retrieving emissions :', error);
      }
    };
    fetchAllEmissions();
  }, []);

  const handleSearch = (results) => {
    setSearchResults(results);
  };


  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">All shows Emissions</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-lg-6">
          <SearchEmission onSearch={handleSearch} />
        </div>
      </div>

      <section className='d-flex justify-content-center flex-wrap'>
        <EmissionsAll />
      </section>

    </div>
  );
};

export default AllEmissionsPage;











