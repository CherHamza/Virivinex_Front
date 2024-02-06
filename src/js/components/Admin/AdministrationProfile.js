import React  from "react";
import {useState, useEffect} from "react";
import {EmissionService} from "../../services/emissionService.js";
import Image1 from "../../../../assets/images/bottle1.jpg";
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
    }, [])

    return (
        <>
        <h1>Admin Profile</h1>
        <div className="container">
        <div className="row">
            {emissions.length > 0 && emissions.map((emission) => (
                emission.publishedForSale ? (
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
                                </ul>
                                <div className="mt-3">
                                    <Link to={`/app/${emission.id}/detail.html`} className="btn btn-primary">
                                        Détails
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
        
        
    
}

export default AdministrationProfile;