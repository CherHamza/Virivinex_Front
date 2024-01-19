import React, { useRef, useState, useEffect } from "react";
import { dataService } from "../services/dataService";


const Emissions = (props) => {

    const [results, setResults] = useState([]);


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
                        "embeddedSeller._id": props.profile
                    },
                    visiblePages: 10,
                    sortName: "id",
                    sortDirection: "ASC",
                    limit: 10,
                    offset: 0,
                    page: 1
                };
                const skus = await dataService.searchEmissions(request);
                console.log('skus ', skus);
                // const array = Object.entries(skus).map(([key, value]) => value);
                setResults(skus.data.content);

            } catch (error) {
                console.error('Error fetching skus', error);
            }
        };

        fetchSku();
    }, [props.profile]);

    console.log('results ', results);

    return (
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
    );
}


export default Emissions;