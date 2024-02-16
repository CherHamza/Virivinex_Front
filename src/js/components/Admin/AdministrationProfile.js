import React, { useState, useEffect } from "react";
import { EmissionService } from "../../services/emissionService";
import { dataService } from "../../services/dataService";
import { Link } from "react-router-dom";

const AdministrationProfile = () => {
    const emissionService = EmissionService.getInstance();
    const [emissions, setEmissions] = useState([]);

    

    useEffect(() => {
        const fetchAllEmissions = async () => {
            try {
                const allEmissions = await emissionService.getAllEmissions();
                console.log("All emissions:", allEmissions);
                setEmissions(allEmissions);

                
            } catch (error) {
                console.error("Erreur lors de la récupération des émissions :", error);
            }
        };

        fetchAllEmissions();
    }, []);

    
    return (
        <>
            <h1>Admin Profile</h1>
            <div className="container">
                <div className="row">
                    {emissions.length > 0 && emissions.map((emission) => (
                        emission.publishedForSale && emission.metaInfo && !emission.metaInfo.publishedSot ? (
                            <div className="col-md-8 mx-auto" key={emission.id}>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">{emission.name}</h5>
                                        <p className="card-text">{emission.description}</p>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">
                                                <strong>Id :</strong> {emission.id}
                                            </li>
                                            <li className="list-group-item">
                                                <strong>Status :</strong> {emission.publishedForSale ? 'true' : 'false'}
                                            </li>
                                            <li className="list-group-item">
                                                <strong>Status :</strong> {emission.metaInfo.publishedSot ? 'true' : 'false'}
                                            </li>
                                        </ul>
                                        <div className="mt-3">
                                            <Link to={`/app/admin/${emission.id}/detail.html`} className="card-link">
                                                Detail
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
        </>
    );
};

export default AdministrationProfile;
