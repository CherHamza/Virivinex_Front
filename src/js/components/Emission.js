import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { dataService } from "../services/dataService";
import { Navigate, useNavigate } from 'react-router-dom'; // Import useNavigate



const Emission = () => {

    const [profile, setProfile] = useState([]);
    const { id } = useParams();
    const [emission, setEmission] = useState([]);
    const [isPublished, setIsPublished] = useState(false);
    const navigate = useNavigate();

    
    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuthenticated = await dataService.isAuthenticated();

            if (isAuthenticated) {
                const userProfile = await dataService.getAuthenticatedProfile();
                setProfile(userProfile);
                // console.log('profile ', userProfile);
            } else {
                navigate("/app/home.html");
            } 
        };
        checkAuthentication();
    }, []);
    
    useEffect(() => {
        const fetchEmission = async () => {
            try {
                let request = {
                    type: "SellerSku",
                    ignoreRegexWrap: [],
                    query: {
                        "id": id,
                    },
                    visiblePages: 10,
                    sortName: "id",
                    sortDirection: "ASC",
                    limit: 10,
                    offset: 0,
                    page: 1
                }
                const result = await dataService.searchEmissions(request);
                console.log('result : ', result);

                
                if (result.data.content.length > 0) {
                    console.log('emission: ', result.data.content[0]);
                    setEmission(result.data.content[0]);
                    setIsPublished(result.data.content[0].publishedForSale)
                    
                } else {
                    console.error(`Aucune émission trouvée avec l'ID ${id}`);
                }
            } catch (error) {
                console.error('Error ', error);
            }
        };
        fetchEmission();
    }, [id]);



    return (
        <section>
            {emission && isPublished ? (
                <>
                    <h2>Détails de l'émission {id}</h2>
                    <p>{emission.name}</p>
                   
                </>
            ) : (
                <p>Oups une erreur est survenue !!!</p>
                
            )}
        </section>
    );
}

export default Emission;