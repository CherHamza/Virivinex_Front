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
            const searchResults = await emissionService.getSearchEmission(searchKeywords);

            setSearchEmission(searchResults);
            setIsSearchEmission(true);
            onSearch(searchResults);

        } catch (error) {
            console.error("Erreur search emissions :", error);
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
