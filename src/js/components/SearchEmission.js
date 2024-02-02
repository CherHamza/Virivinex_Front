import React, { useState } from 'react';
import { EmissionService } from '../services/emissionService';
import { dataService } from '../services/dataService';

const SearchEmission = ({ onSearch }) => {
    const [searchKeywords, setSearchKeywords] = useState('');
    const [searchEmission, setSearchEmission] = useState([]);
    const [isSearchEmission, setIsSearchEmission] = useState(false);
    const emissionService = EmissionService.getInstance();

    const handleSearch = async () => {
        try {
            // console.log("Search keywords:", searchKeywords);

            // Recherchez les émissions dans la base de données en fonction des mots-clés
            const searchResults = await emissionService.getSearchEmission(searchKeywords);
            // console.log("Search results:", searchResults);

            setSearchEmission(searchResults);
            setIsSearchEmission(true);
            onSearch(searchResults);

        } catch (error) {
            console.error("Erreur lors de la recherche d'émissions :", error);
        }
    };

    return (
        <div className="search-by-criteria">
            <input
                type="text"
                placeholder="Type keywords"
                value={searchKeywords}
                onChange={(e) => setSearchKeywords(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchEmission;
