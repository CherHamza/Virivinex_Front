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

    // console.log('results ', results);

    if(results.length > 0) {

        results.map((res)=>{

            if(res.publishedForSale){

                // console.log("RES", res);

            // const newEmissionApi = {

            //     emissionUnique_id: "",
            //     wineTitleName: res.name,
            //     emissionCardLink: "",
            //     winery: res.embeddedSeller.name,
            //     // loggedProfile && loggedProfile.embeddedParent ? loggedProfile.embeddedParent.name : null,
            //     areaOfProduction: "",
            //     wineMacroRegion: "",
            //     country: "",
            //     yearOfBottling: "",
            //     typeOfWine: "",
            //     initialQuantityoOfUniqueBottlesInEmission: "",
            //     bottleSize_TradingUnitType: "",
            //     emissionRecordReference: "",
            //     ledgerOfEmissionVideoRecording: "",
            //     uniquenessFactorType: "",
            //     uniquenessFactorDescription: res.description,
            //     emissionStatus: "",
            //     ledgersOfEmissionVideoRecording: "",
            //     wineDescriptiveCombination: ""
        
            //     };
            //     console.log("newEmissionAPi", newEmissionApi);

                
        };

        })
    
    }

    // useEffect (()=>{
    //     const fetchDataApi = async ()=>{
    //         const apiEmission = await apiService.setSotEmission(NewEmissionApi);
    //         console.log("apiEmission", apiEmission)

    //     }
    //     fetchDataApi();
    // }, [])


    
        

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