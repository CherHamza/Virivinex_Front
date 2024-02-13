import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { EmissionService } from "../../services/emissionService";
import { ApiService } from "../../services/apiService";
import { dataService } from "../../services/dataService";

const DetailEmission = () => {
    const [emission, setEmission] = useState(null);
    const { id } = useParams();
    const emissionService = EmissionService.getInstance();
    const apiService = ApiService.getInstance();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmission = async () => {
            try {
                const fetchedEmission = await emissionService.getEmissionById(id);
                setEmission(fetchedEmission[0]);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'émission :", error);
            }
        };
        fetchEmission();
    }, [id]);

    


    const handleSendToSOT = async () => {
        try {
            if (emission) {
              const wineMacroRegionOptions = emission.attributeValues[3].attribute.options;
              const typeOfWineOptions = emission.attributeValues[5].attribute.options;
              const selectedValue = emission.attributeValues[3].value;
              const selectedValueTypeWine = emission.attributeValues[5].value;
        
              // Filtrer les options pour trouver celle correspondant à la valeur sélectionnée
              const selectedOption = wineMacroRegionOptions.find(option => option.id === selectedValue);
              const selectedOptionTypeWine = typeOfWineOptions.find(option => option.id === selectedValueTypeWine)
        
              // Récupérer le searchTerms de l'option sélectionnée
              const selectedSearchTerms = selectedOption ? selectedOption.searchTerms : '';
              const selectedSearchTermsTypeWine = selectedOptionTypeWine ? selectedOptionTypeWine.searchTerms: '';

              
              
                // Construction de l'objet pour l'envoi à SOT
                const newEmissionApi = {
                    emissionUnique_id: "",
                    wineTitleName: emission.name,
                    description: emission.description,
                    emissionCardLink: "",
                    winery: emission.embeddedSeller.name,
                    areaOfProduction: emission.attributeValues[4].value,
                    wineMacroRegion: selectedSearchTerms,
                    country: emission.attributeValues[2].value,
                    yearOfBottling: emission.attributeValues[10].value,
                    typeOfWine: selectedSearchTermsTypeWine,                    
                    initialQuantityoOfUniqueBottlesInEmission: emission.attributeValues[11].value,
                    bottleSize_TradingUnitType: emission.attributeValues[7].value,
                    emissionRecordReference: emission.attributeValues[12].value,
                    ledgerOfEmissionVideoRecording: emission.attributeValues[13].value,
                    uniquenessFactorType: emission.attributeValues[14].value,
                    uniquenessFactorDescription: emission.attributeValues[15].value,
                    emissionStatus: emission.publishedForSale,
                    wineDescriptiveCombination: selectedSearchTermsTypeWine + ";" + selectedSearchTerms,
                };

                // Envoie l'émission à SOT
                const apiEmission = await apiService.setSotEmission(newEmissionApi);
                console.log("Creation SOT", apiEmission);
                
              // Dernier enregistrement in SOT
         const lastRecordEmission = await apiService.getLastRecord();
         console.log('Last record ', lastRecordEmission._id);

         const oidValue = lastRecordEmission._id["$oid"]; 

         const idEmissionCMS = emission.id;

         //concatenation ID emissionUniqueId
         const concatenatedId = idEmissionCMS + '_'+ oidValue;
         console.log('concatenation ', concatenatedId);

         // Update field 
         const newEmissionId = await apiService.updateEmissionId(oidValue, concatenatedId)

                const requestBody = {
                    additionalTextInfo: emission.additionalTextInfo,
                    attributeValues: emission.attributeValues,
                    countryOfOrigin: emission.countryOfOrigin,
                    countryOfSeller: {
                      code: emission.countryOfSeller.code,
                      language: emission.countryOfSeller.language,
                      name: emission.countryOfSeller.name
                    },
                    createdBy: emission.createdBy,
                    createdDate: emission.createdDate,
                    currencyItem: emission.currencyItem,
                    deliveryType: emission.deliveryType,
                    description: emission.description,
                    durabilityDate1: emission.durabilityDate1,
                    durabilityDate2: emission.durabilityDate2,
                    embeddedSeller: {
                      id: emission.embeddedSeller.id,
                      name: emission.embeddedSeller.name,
                      repositoryName: emission.embeddedSeller.repositoryName
                    },
                    embeddedSku: {
                      id: emission.embeddedSku.id,
                      name: emission.embeddedSku.name,
                      repositoryName: emission.embeddedSku.repositoryName
                    },
                    expireDate: emission.expireDate,
                    geneticType: emission.geneticType,
                    id: emission.id,
                    imageURLs: emission.imageURLs,
                    incoTerm: emission.incoTerm,
                    inventory: {
                      countPerUnit: emission.inventory.countPerUnit,
                      embeddedSellerSKU: {
                        id: emission.inventory.embeddedSellerSKU.id,
                        name: emission.inventory.embeddedSellerSKU.name,
                        repositoryName: emission.inventory.embeddedSellerSKU.repositoryName
                      },
                      id: emission.inventory.id,
                      lockedQuantity: emission.inventory.lockedQuantity,
                      minOrder: emission.inventory.minOrder,
                      quantity: emission.inventory.quantity
                    },
                    keywords: emission.keywords,
                    lastModifiedBy: emission.lastModifiedBy,
                    lastModifiedDate: emission.lastModifiedDate,
                    listTypeFilters: emission.listTypeFilters,
                    logicalTypeFilters: emission.logicalTypeFilters,
                    metaInfo: {
                        publishedSot: true,
                    },
                    name: emission.name,
                    numericFilters: emission.numericFilters,
                    orderedItems: emission.orderedItems,
                    packagedItems: emission.packagedItems,
                    price: emission.price,
                    productsRef: emission.productsRef,
                    publishedForSale: emission.publishedForSale,
                    randomGenerated: emission.randomGenerated,
                    rangeFilters: emission.rangeFilters,
                    score: emission.score,
                    searchTerms: emission.searchTerms,
                    simpleTypeFilters: emission.simpleTypeFilters,
                    type: emission.type,
                    unit: emission.unit
                  };
                  
                  // Utilisation de l'objet requestBody pour envoyer la requête
                  // (mettez ici votre code pour envoyer la requête avec cet objet)
                  
                // Mettre à jour la propriété publishedSot de l'émission
                await dataService.saveEmissionAsDraft(requestBody);
                console.log("requestBody:", requestBody)

                setEmission(requestBody)
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'émission à SOT :", error);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleRemoveEmission = (id) => {
        // Supprimer l'émission de l'interface d'administration
        setEmission(null);
        console.log("Suppression de l'émission avec l'ID :", id);
    };

    return (
        <section className="container mt-5">
            {emission ? (
                <div className="row">
                    <div className="col-md-6">
                        {/* Image de l'émission */}
                    </div>
                    <div className="col-md-6">
                        <h2 className="mb-4">Winnery : {emission.embeddedSeller.name}</h2>
                        <h3 className="text-primary">{emission.name}</h3>
                        <p className="lead">{emission.description}</p>
                        <hr className="my-4" />
                        <button
                            className="btn btn-secondary"
                            onClick={handleGoBack}
                        >
                            Page précédente
                        </button>
                        <button
                            className="btn btn-warning ml-3"
                            onClick={handleSendToSOT}
                        >
                            Envoyer à SOT
                        </button>
                    </div>
                </div>
            ) : (
                <div className="alert alert-danger mt-3" role="alert">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                    Oups ! Une erreur est survenue. Veuillez réessayer.
                </div>
            )}
        </section>
    );
};

export default DetailEmission;
