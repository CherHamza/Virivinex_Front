import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { EmissionService } from "../../services/emissionService";
import { ApiService } from "../../services/apiService";
import { dataService } from "../../services/dataService";
import { UserTypeButton } from './../UserType';
import { v4 as uuidv4 } from 'react-uuid';

const DetailEmission = () => {
    const [emission, setEmission] = useState(null);
    const [attribute, setAttribute] = useState(null);
    const { id } = useParams();
    const [selected, setSelected ] = useState(null);
    const emissionService = EmissionService.getInstance();
    const apiService = ApiService.getInstance();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmission = async () => {
            try {
                const fetchedEmission = await emissionService.getEmissionById(id);
                setEmission(fetchedEmission[0]);

                const attributesEmissions = await dataService.getAttributeValuesFromSellerSKU(id);
                setAttribute(attributesEmissions);

                const wineMacroRegionOptions = attributesEmissions[20].attribute.options;
                const typeOfWineOptions = attributesEmissions[21].attribute.options;
                const statusEmissionOptions = attributesEmissions[2].attribute.options;
                const countryOptions = attributesEmissions[19].attribute.options;
                const sizeOptions = attributesEmissions[17].attribute.options;

                const selectedValue = attributesEmissions[20].value;
                const selectedValueTypeWine = attributesEmissions[21].value;
                const selectedValueStatus = attributesEmissions[2].value;
                const selectedCountry = attributesEmissions[19].value;
                const selectedSize = attributesEmissions[17].value;

                // Filtrer les options pour trouver celle correspondant à la valeur sélectionnée
                const selectedOption = wineMacroRegionOptions.find(option => option.id === selectedValue);
                const selectedOptionTypeWine = typeOfWineOptions.find(option => option.id === selectedValueTypeWine);
                const selectedOptionStatus = statusEmissionOptions.find(option => option.id === selectedValueStatus);
                const selectedOptionCountry = countryOptions.find(option => option.id === selectedCountry);
                const selectedOptionSize = sizeOptions.find(option => option.id === selectedSize);

                // Récupérer le searchTerms de l'option sélectionnée
                const selectedSearchTerms = selectedOption ? selectedOption.searchTerms : '';
                const selectedSearchTermsTypeWine = selectedOptionTypeWine ? selectedOptionTypeWine.searchTerms : '';
                const selectedSearchTermsStatus = selectedOptionStatus ? selectedOptionStatus.searchTerms : '';
                const selectedSearchTermsCountry = selectedOptionCountry ? selectedOptionCountry.searchTerms : '';
                const selectedSearchTermsSize = selectedOptionSize ? selectedOptionSize.searchTerms : '';


                setSelected([
                    selectedSearchTerms,
                    selectedSearchTermsTypeWine,
                    selectedSearchTermsStatus,
                    selectedSearchTermsCountry,
                    selectedSearchTermsSize,
                ])

                // console.log(' attributes ; ', attributesEmissions);

           
            } catch (error) {
                console.error("Erreur lors de la récupération de l'émission :", error);
            }
        };
        fetchEmission();
    }, [id]);

   
    // console.log(' selected ; ', selected);


    
    const handleSendToSOT = async () => {
        try {
            if (emission) {
              const wineMacroRegionOptions = attribute[20].attribute.options;
              const typeOfWineOptions = attribute[21].attribute.options;
              const statusEmissionOptions = attribute[2].attribute.options;
                const countryOptions = attribute[19].attribute.options;
                const sizeOptions = attribute[17].attribute.options;

                const selectedValue = attribute[20].value;
                const selectedValueTypeWine = attribute[21].value;
                const selectedValueStatus = attribute[2].value;
                const selectedCountry = attribute[19].value;
                const selectedSize = attribute[17].value;
        
              // Filtrer les options pour trouver celle correspondant à la valeur sélectionnée
              const selectedOption = wineMacroRegionOptions.find(option => option.id === selectedValue);
              const selectedOptionTypeWine = typeOfWineOptions.find(option => option.id === selectedValueTypeWine);
              const selectedOptionStatus = statusEmissionOptions.find(option => option.id === selectedValueStatus);
                const selectedOptionCountry = countryOptions.find(option => option.id === selectedCountry);
                const selectedOptionSize = sizeOptions.find(option => option.id === selectedSize);
        
              // Récupérer le searchTerms de l'option sélectionnée
              const selectedSearchTerms = selectedOption ? selectedOption.searchTerms : '';
              const selectedSearchTermsTypeWine = selectedOptionTypeWine ? selectedOptionTypeWine.searchTerms: '';
                const selectedSearchTermsStatus = selectedOptionStatus ? selectedOptionStatus.searchTerms : '';
                const selectedSearchTermsCountry = selectedOptionCountry ? selectedOptionCountry.searchTerms : '';
                const selectedSearchTermsSize = selectedOptionSize ? selectedOptionSize.searchTerms : '';

            
                // Construction de l'objet pour l'envoi à SOT
                const newEmissionApi = {
                    emissionUnique_id: "",
                    wineTitleName: emission.name,
                    description: emission.description,
                    emissionCardLink: "",
                    winery: emission.embeddedSeller.name,
                    areaOfProduction: attribute[18].value,
                    wineMacroRegion: selectedSearchTerms,
                    country: selectedSearchTermsCountry,
                    yearOfBottling: attribute[15].value,
                    typeOfWine: selectedSearchTermsTypeWine,               
                    initialQuantityoOfUniqueBottlesInEmission: attribute[10].value,
                    bottleSize_TradingUnitType: selectedSearchTermsSize,
                    emissionRecordReference: attribute[3].value,
                    ledgerOfEmissionVideoRecording: attribute[4].value,
                    uniquenessFactorType: attribute[5].value,
                    uniquenessFactorDescription: attribute[6].value,
                    emissionStatus: selectedSearchTermsStatus,
                    wineDescriptiveCombination: selectedSearchTermsTypeWine + ";" + selectedSearchTerms,
                };

                // Envoie l'émission à SOT
                const apiEmission = await apiService.setSotEmission(newEmissionApi);
                // console.log("Creation SOT", apiEmission);
                
              // Dernier enregistrement in SOT
         const lastRecordEmission = await apiService.getLastRecord();
        //  console.log('Last record ', lastRecordEmission._id);

         const oidValue = lastRecordEmission._id["$oid"]; 

         const idEmissionCMS = emission.id;

         //concatenation ID emissionUniqueId
         const concatenatedId = idEmissionCMS + '_'+ oidValue;
        //  console.log('concatenation ', concatenatedId);


                // const { v4: uuidv4 } = require('uuid'); // Import de la fonction uuidv4 pour la génération d'IDs uniques

                const createBottlesForEmission = async (concatenatedId, numberOfBottles) => {
                    try {
                        const bottles = [];
                        for (let i = 0; i < numberOfBottles; i++) {
                            // Fonction pour générer un identifiant unique
                            const bottleId = () => {
                                return Date.now().toString(36) + Math.random().toString(36).substr(2);
                            };
                            const bottle = {

                                uniqueBottle_id: bottleId(),
                                emissionUnique_id: concatenatedId,
                                wineTitleName: emission.name,
                                emissionCardLink: "",
                                currentBottleStatus: "",
                                currentOwner_Proxy_id: "",
                                precedentStatu: "",
                                lastTransaction_Transaction_id: "",
                                lastTranscationDate: "",
                                lastEvent_Event_id: "",
                                lastEventDate: "",
                                lastEventType: "",
                                aggregateQuantityOfTransactionsSinceEmission: "",
                                aggregateQuantityOfTransactionsInCurrentYear: "",
                                lastKnownTransactionPrice: "",
                            };
                            bottles.push(bottle);
                        }

                        // Insérez les bouteilles dans la base de données
                        // Supposons que vous avez une fonction pour insérer des bouteilles dans la base de données

                        const insertBottlesSot = await apiService.createBottlesEmissionSot(concatenatedId, bottles)

                        console.log("bottlesSot", insertBottlesSot)


                        console.log(`${numberOfBottles} bouteilles ont été créées pour l'émission avec l'ID ${concatenatedId}`);
                    } catch (error) {
                        console.error('Erreur lors de la création des bouteilles :', error);
                    }
                };

                // Utilisation de la fonction pour créer cinq bouteilles pour une émission donnée
                createBottlesForEmission(concatenatedId, 5);


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
                // console.log("requestBody:", requestBody)

                setEmission(requestBody)
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'émission à SOT :", error);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };


    return (
        <section className="container mt-5">
            {emission && attribute ? (
                <div className="row">
                    <div className="col-md-6">
                        {/* Image de l'émission */}
                    </div>
                    <div className="col-md-6">
                        <h2 className="mb-4">Winery : {emission.embeddedSeller.name}</h2>
                        <h3 className="text-primary">Wine title : {emission.name}</h3>
                        <p className="lead">Description : {emission.description}</p>
                        <p className="lead">Area Of production : {attribute[18].value}</p>
                        <p className="lead">Wine Macro Region : {selected[0]}</p>
                        <p className="lead">Country : {selected[3]}</p>
                        <p className="lead">Year Of Bottling : {attribute[15].value}</p>
                        <p className="lead">Type of Wine : {selected[1]}</p>
                        <p className="lead">Initial Quantity Of Unique Bottles In Emission : {attribute[10].value}</p>
                        <p className="lead">Bottle Size : {selected[4]}</p>
                        <p className="lead">Emission Record Reference : {attribute[3].value}</p>
                        <p className="lead">ledger Of Emission Video Recording : {attribute[4].value}</p>
                        <p className="lead">Uniqueness Factor Type : {attribute[5].value}</p>
                        <p className="lead">Uniqueness Factor Description : {attribute[6].value}</p>
                        <p className="lead">Emission Status : {selected[2]}</p>

                        
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
