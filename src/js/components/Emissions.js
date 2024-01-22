import React, { useRef, useState, useEffect } from "react";
import { dataService } from "../services/dataService";


const Emissions = (props) => {

    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const editions = [
        { id: 1, pic: 'image-source', text: 'Texte', owned: 3000, marketPrice: 30.00, value: 90000.00 },

    ];

    useEffect(() => {
        const fetchSku = async () => {
            try {
                let request = {
                    type: "SellerSku",
                    ignoreRegexWrap: [],
                    query: {
                        "embeddedSeller._id": props.profile,

                    },
                    visiblePages: 10,
                    sortName: "id",
                    sortDirection: "ASC",
                    limit: 10,
                    offset: (currentPage - 1) * 10,
                    page: currentPage
                };
                const skus = await dataService.searchEmissions(request);
                console.log('skus ', skus);
                // const array = Object.entries(skus).map(([key, value]) => value);
                setResults(skus.data.content);
                setTotalPages(skus.data.totalPages);

            } catch (error) {
                console.error('Error fetching skus', error);
            }
        };

        fetchSku();
    }, [props.profile, currentPage]);

    console.log('results ', results);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <section className="editions-list">
                {results.map(result => (
                    <div className="edition-item" key={result.id}>
                        <div className="edition-details">
                            <span>{result.name}</span>
                            <span>{result.embeddedSku.name}</span>
                            <span>Created by : {result.embeddedSeller.name}</span>
                        </div>
                    </div>
                ))}
            </section>

            <div>
                <p>Page {currentPage} of {totalPages}</p>
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                    Previous Page
                </button>
                <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                    Next Page
                </button>
            </div>
        </div>
    );
}

export default Emissions;
