import React, { useEffect, useState } from 'react';
import DisplayEmissionSearch from './DisplayEmissionSearch'; // Importez le composant pour afficher les émissions
import SearchEmission from './SearchEmission'; // Importez le composant de recherche d'émissions
import { EmissionService } from '../services/emissionService'; // Importez le service pour récupérer les émissions

const AllEmissionsPage = () => {
  const [emissions, setEmissions] = useState([]); // État local pour stocker les émissions
  const [searchResults, setSearchResults] = useState([]); // État local pour stocker les résultats de recherche

  useEffect(() => {
    // Fonction pour récupérer toutes les émissions
    const fetchAllEmissions = async () => {
      try {
        // Utilisez votre service pour récupérer les émissions
        const emissionService = EmissionService.getInstance();
        const allEmissions = await emissionService.getAllEmissions(); // Supposons que cette méthode récupère toutes les émissions

        // Mettez à jour l'état local avec les émissions récupérées
        setEmissions(allEmissions);
      } catch (error) {
        console.error('Erreur lors de la récupération des émissions :', error);
      }
    };

    // Appelez la fonction pour récupérer toutes les émissions lorsque le composant est monté
    fetchAllEmissions();
  }, []);

  // Fonction de gestion de la recherche d'émissions
  const handleSearch = (results) => {
    setSearchResults(results);
  };

  // Fonction pour diviser les émissions en groupes de 3
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
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Affichage des émissions en fonction des résultats de recherche */}
          {splitEmissionsIntoRows(searchResults.length > 0 ? searchResults : emissions).map((row, index) => (
            <div key={index} className="row mb-4">
              {row.map((emission) => (
                <div key={emission.id} className="col-lg-4">
                  <DisplayEmissionSearch emissions={[emission]} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllEmissionsPage;
