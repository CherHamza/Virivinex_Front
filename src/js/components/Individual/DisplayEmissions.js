import React from "react";
import { useState, useEffect } from "react";
import Image1 from "../../../../assets/images/bottle1.jpg";
import {dataService} from "../../services/dataService.js"

const DisplayEmissions = (props) => {

    const imageSrc = Image1;
    const[emissions, setEmissions] = useState([]);


    useEffect( ()=>{ 
        const fetchEmissions = async ()=>{

            try{
                let request = {
                    type: "SellerSku",
                    ignoreRegexWrap: [],
                    query: {
    
                    },
                    visiblePages: 10,
                    sortName: "id",
                    sortDirection: "ASC",
                    limit: 10,
                    offset: 0,
                    page: 1
                };
                const storeEmission = await dataService.searchEmissions(request);
                setEmissions(storeEmission.data.content);
                console.log("storeEmission:", storeEmission)
            } catch(e){
                console.error("erreur fetching:", e)
            }
        };
        fetchEmissions();


    }, [])

    
    return (
    <>
     {emissions.length > 0 && emissions.map((emission) => (
      <div className="card" style={{ width: "18rem" }} key={emission.id}>
        <img src={imageSrc} alt={emission.name} />
        <div className="card-body">
          <h5 className="card-title">{emission.name}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">An item</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
        </ul>
        <div className="card-body">
          {/* <a href="#" className="card-link">Card link</a> */}
        </div>
      </div>
    ))}
  </> 
        
    );
}

export default DisplayEmissions;