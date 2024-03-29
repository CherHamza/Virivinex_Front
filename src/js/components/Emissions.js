import React, { useRef, useState, useEffect } from "react";
import { dataService } from "../services/dataService";
import { EmissionService } from "../services/emissionService";
import { ApiService } from "../services/apiService";

const Emissions = (props) => {

    const [results, setResults] = useState([]);
    const emissionService = EmissionService.getInstance(); 
    const apiService = ApiService.getInstance();

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
                    limit: 30,
                    offset: 0,
                    page: 1
                };
                const skus = await dataService.searchEmissions(request);
               
                setResults(skus.data.content);

            } catch (error) {
                console.error('Error fetching skus', error);
            }
        };

        fetchSku();
    }, [props.profile]);


   
        

    return (
        <section className="editions-list">
            {results.map(result => (
                <div className="edition-item" key={result.id}>
                    <div className="edition-details">
                        <span>{result.name}</span>
                        <span>{result.embeddedSku.name}</span>
                        <span>Description of the product: {result.description}</span>
                        <span>Created by: {result.embeddedSeller.name}</span>
                        <div className="status_emission" style={{width: '100px'}}>
                        <p>
                        Status:
                            <span style={{
                                border: result.publishedForSale
                                    ? '2px solid green'
                                    : '2px solid grey',
                                background: result.publishedForSale
                                    ? 'lightgreen'
                                    : 'lightgrey',
                                padding: '5px', 
                                borderRadius: '5px' 
                            }}>
                                 {result.publishedForSale ? 'Published' : 'In review'}
                            </span>
                        </p>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
    
    
}


export default Emissions;