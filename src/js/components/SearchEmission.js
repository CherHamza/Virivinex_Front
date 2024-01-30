import React, { useState } from 'react';
import { emissionService } from '../services/emissionService';
import { dataService } from '../services/dataService';

const SearchEmission = ({ onSearch }) => {
    const [searchKeywords, setSearchKeywords] = useState('');
    const [searchEmission, setSearchEmission] = useState([]);
    const [isSearchEmission, setIsSearchEmission] = useState(false);


    const handleSearch = async () => {
        try {
            console.log("Search keywords:", searchKeywords);

            // Recherchez les émissions dans la base de données en fonction des mots-clés
            let request = {
                type: "SellerSku",
                ignoreRegexWrap: [],
                query: {
                    $or: [
                        { "name": { $regex: searchKeywords, $options: "i" } },
                        { "description": { $regex: searchKeywords, $options: "i" } },
                    ],
                },
                visiblePages: 10,
                sortName: "id",
                sortDirection: "ASC",
                limit: 10,
                offset: 0,
                page: 1
            };
            console.log("Search request:", request);

            const searchResults = await dataService.searchEmissions(request);
            console.log("Search results:", searchResults);

            setSearchEmission(searchResults.data.content);
            setIsSearchEmission(true);
            onSearch(searchResults.data.content)
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
