import React from "react";
import { useState, useEffect } from "react";
import Image1 from "../../../../assets/images/bottle1.jpg";
import { dataService } from "../../services/dataService.js"
import { Link } from "react-router-dom";

const DisplayEmissions = (props) => {

    const imageSrc = Image1;
    const [emissions, setEmissions] = useState([]);
    const [isPublished, setIsPublished] = useState(false);

    useEffect( ()=>{ 
        const fetchEmissions = async ()=>{
            try{
                let request = {
                    type: "SellerSku",
                    ignoreRegexWrap: [],
                    query: {},
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
        emission.publishedForSale ? (
          <div className="card m-4" style={{ width: "18rem" }} key={emission.id}>
            <img src={imageSrc} alt={emission.name} />
            <div className="card-body">
              <h5 className="card-title">{emission.name}</h5>
              <p className="card-text">
                {emission.description}
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Id : {emission.id}</li>
              <li className="list-group-item">Status : {emission.publishedForSale ? 'true' : 'false'}</li>
            </ul>
            <div className="card-body">
              <Link to={`/app/${emission.id}/detail.html`} className="card-link">
                Detail
              </Link>
            </div>
          </div>
        ) : null

        
      ))}
    </>
  );
}
export default DisplayEmissions;