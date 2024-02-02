import React from "react";
import { useState, useEffect } from "react";
import Image1 from "../../../assets/images/bottle1.jpg";
import { Link } from "react-router-dom";
import { emissionService } from "../services/emissionService";

const DisplayEmissionSearch = ({ emissions }) => {

    const imageSrc = Image1;
    const [emissionsSearch, setEmissionsSearch] = useState([]);
    const [isPublished, setIsPublished] = useState(false);

    useEffect( ()=>{ 
      setEmissionsSearch(emissions);

    }, [emissions])

    
  return (
    <>
      {emissionsSearch.length > 0 && emissionsSearch.map((emission) => (
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
export default DisplayEmissionSearch;