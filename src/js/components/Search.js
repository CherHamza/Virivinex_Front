import React, { useRef, useState, useEffect } from "react";
import { dataService } from "../services/dataService";


const Search = (props) => {
    const [isResultsExists, setIsResultsExists] = useState(false);
    const [results, setResults] = useState([]);
    const searchInput = useRef(null);

    useEffect(() => {
        if (results.length > 0) {
            setIsResultsExists(true);
        } else {
            setIsResultsExists(false);
        }
    }, [results]);

    const handleSearch = async () => {
        let inputValue = searchInput.current.value.trim();
        console.log(inputValue);

        if (inputValue !== "" && inputValue !== undefined ) {
            let request = {
                query: {
                    searchTerms: {
                        $regex: inputValue,
                        $options: "i"
                    }
                },
                visiblePages: 10,
                sortName: "id",
                sortDirection: "ASC",
                limit: 10,
                offset: 0,
                page: 1
            };

            try {
                const response = await dataService.getSkus(request);
                const skus = response.data.content;

                const results = skus.map((sku) => ({ id: sku.id, searchTerms: sku.searchTerms.split(',') }));
                setResults(results);
                console.log('Results:', results);

            } catch (error) {
                console.error("Error fetching filtered SKUs:", error);
            }
        } else {
            // Réinitialisez les résultats si le champ de recherche est vide
            setResults([]);
        }
    };

    const handleSelectChange = (event) => {
        if (event.target.value !== "nothing") {
            const embeddedSkuName = event.target.value;
            console.log('embeddedSkuName:', embeddedSkuName);

            const filteredResult = results.filter((result) => result.searchTerms.includes(embeddedSkuName));
            // console.log('filteredResult ', filteredResult);

            if (filteredResult.length > 0) {
                const embeddedSkuId = filteredResult[0].id;
                console.log('embeddedSkuId:', embeddedSkuId);

                props.setSkuId(embeddedSkuId);
                props.setSkuName(embeddedSkuName);
                
            } else {
                console.log('Aucune correspondance.');
            }
        }
    };


    return (
        <>
            <div className="form-group">
                <label htmlFor="searchCategory">Search the Type Of Wine</label>
                <input
                    type="text"
                    className="form-control"
                    id="searchCategory"
                    name="searchCategory"
                    ref={searchInput}
                />

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSearch}>
                    Search
                </button>

                {(isResultsExists ?
                    <select className="form-select mt-3" onChange={handleSelectChange}>
                        <option value="nothing">Select a name</option>
                        {results && results.map((r) =>
                            r.searchTerms.map((term, index) =>
                                <option key={index} value={term}>{term}</option>
                            )
                        )}
                    </select>
                    : '')
                }
            </div>
        </>
    );
};

export default Search;

