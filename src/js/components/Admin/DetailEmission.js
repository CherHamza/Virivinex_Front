import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { EmissionService } from "../../services/emissionService";
import { ApiService } from "../../services/apiService";
import { dataService } from "../../services/dataService";
import { UserTypeButton } from './../UserType';
import { toast } from 'react-toastify'; 
import "../../../css/detailEmission.css";



const DetailEmission = () => {
    const [emission, setEmission] = useState(null);
    const [attribute, setAttribute] = useState(null);
    const [ disable, setDisable ] = useState(false);
    const { id } = useParams();
    const [selectedOptions, setSelectedOptions] = useState(Array(5).fill(null));

    const [test, setTest ] =useState(emission);
    const [selected, setSelected ] = useState(null);
    const emissionService = EmissionService.getInstance();
    const apiService = ApiService.getInstance();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmission = async () => {
            try {
                // Retrieve emission
                const fetchedEmission = await emissionService.getEmissionById(id);
                setEmission(fetchedEmission[0]);
                // console.log('em ', fetchedEmission[0].embeddedSeller)

                const attributesEmissions = await dataService.getAttributeValuesFromSellerSKU(id);
                setAttribute(attributesEmissions);
                console.log('attributesEmissions ', attributesEmissions)

                const selectedOptions = getSelectedOptions(attributesEmissions);
                setSelectedOptions(selectedOptions);
                // console.log('selectedOptions ', selectedOptions)
           
            } catch (error) {
                console.error("Erreur lors de la récupération de l'émission :", error);
            }
        };
        fetchEmission();
    }, [id]);

    const getSelectedOptions = (attributes) => {
        const selectedOptions = attributes.map(attribute => {
            const options = attribute.attribute.options;
            const selectedValue = attribute.value;
            const selectedOption = options.find(option => option.id === selectedValue);
            return selectedOption ? selectedOption.searchTerms.split(',')[0] : '';
        });
        return selectedOptions;
    };
   
    const handleSendToSOT = async () => {
        try {
            if (emission && attribute) {
            // Construction de l'objet pour l'envoi à SOT
                const newEmissionSot = buildObjetEmissionSot(emission, attribute, selectedOptions);
                // console.log('objetSot', newEmissionSot)

            // Envoie l'émission à SOT
                const apiEmission = await apiService.setSotEmission(newEmissionSot);
                
                
              // Dernier enregistrement in SOT
                const lastRecordEmission = await apiService.getLastRecord();
                //  console.log('Last record ', lastRecordEmission._id);

            //Retrieve _id on the sot
                const oidValue = lastRecordEmission._id["$oid"]; 

            //Retrieve id cms
                const idEmissionCMS = emission.id;

            //concatenation ID emissionUniqueId
                const concatenatedId = idEmissionCMS + '_'+ oidValue;
                // console.log('concatenation ', concatenatedId);


                createBottlesForEmission(concatenatedId, emission.inventory.quantity);

            
                // Update field 
                apiService.updateEmissionId(oidValue, concatenatedId)

                // Appel de la fonction updateEmissionOnTheMastermind avec les paramètres emission et attribute
                updateEmissionOnTheMastermind(emission, concatenatedId);

                
                toast.success("L'émission a été envoyée à SOT avec succès!", {
                    position: toast.POSITION.TOP_RIGHT,

                });
return concatenatedId
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'émission à SOT :", error);
            toast.error("Échec de l'envoi de l'émission à SOT. Veuillez réessayer.", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const buildObjetEmissionSot = (emission, attribute, selectedOptions) => {
        if (emission && attribute && selectedOptions ) {
            const newEmissionApi = {
                emissionUnique_id: "",
                wineTitleName: emission.name,
                description: emission.description,
                emissionCardLink: "",
                winery: emission.embeddedSeller.name,
                areaOfProduction: attribute[18].value,
                wineMacroRegion: selectedOptions[20],
                country: selectedOptions[19],
                yearOfBottling: attribute[15].value,
                typeOfWine: selectedOptions[21],
                initialQuantityoOfUniqueBottlesInEmission: attribute[1].value,
                emissionPriceTarget: attribute[10].value,
                bottlesQuantity: emission.inventory.quantity,
                bottleSize_TradingUnitType: selectedOptions[17],
                emissionRecordReference: attribute[3].value,
                ledgerOfEmissionVideoRecording: attribute[4].value,
                uniquenessFactorType: attribute[5].value,
                uniquenessFactorDescription: attribute[6].value,
                emissionStatus: selectedOptions[2],
                wineDescriptiveCombination: selectedOptions[21] + ";" + selectedOptions[20],
                created_at: new Date(),
            };
            return newEmissionApi;
        } else {
            return null; 
        }
    }

    const createBottleForEmission = async (concatenatedId) => {
        try {
            // Fonction pour générer un identifiant unique
            const bottleId = () => {
                return Date.now().toString(36) + Math.random().toString(36).substr(2);
            };
            
            await apiService.createBottlesEmissionSot({
                uniqueBottle_id: bottleId(),
                emissionUnique_id: concatenatedId,
                wineTitleName: emission.name,
                emissionCardLink: "",
                emissionPriceTarget: attribute[10].value,
                currentBottleStatus: "",
                currentOwner_Proxy_id: emission.embeddedSeller.name,
                precedentStatus: "",
                lastTransaction_Transaction_id: 0,
                lastTransactionDate: new Date(),
                lastEvent_Event_id: concatenatedId,
                lastEventDate: new Date(),
                lastEventType: "",
                aggregateQuantityOfTransactionsSinceEmission: 1,
                aggregateQuantityOfTransactionsInCurrentYear: 1,
                lastKnownTransactionPrice: attribute[10].value,
            });
            setDisable(true);
        } catch (error) {
            console.error('Erreur lors de la création de la bouteille :', error);
        }
    }
    
    const createBottlesForEmission = async (concatenatedId, bottlesQuantity) => {
        try {
            for (let i = 0; i < bottlesQuantity; i++) {
                await createBottleForEmission(concatenatedId);
            }
        } catch (error) {
            console.error('Erreur lors de la création des bouteilles :', error);
        }
    }
    


    // Update Emission on the cms 
    const updateEmissionOnTheMastermind = async (emission, concatenatedId) => {
        if (emission && attribute) {
            
                // const requestBody = {
                //     id: emission.id,
                //     name: emission.name,
                //     embeddedSeller: emission.embeddedSeller,
                //     attributeValues: [
                //         {
                //             attribute:
                //                 { id: "Emission Unique ID" },
                //             active: true,
                //             value: concatenatedId,
                //         },
                //     ],
                //     embeddedSku: emission.embeddedSku,
                //     metaInfo: {
                //         publishedSot: true,
                //     }
                // }

            const requestBody = {
                additionalTextInfo: emission.additionalTextInfo,
                attributeValues: [
                    ...emission.attributeValues,
                    {
                attribute: { id: "Emission Unique ID" },
                active: true,
                    value: concatenatedId,
                    },
                ], 
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

                console.log("requestBody:", requestBody);
              
                await dataService.saveEmissionAsDraft(requestBody);
                return requestBody;
            }

            else {
                console.error("Attribute not found in attributeValues array.");
                return null;
            }
        }
        
        // updateEmissionOnTheMastermind(emission, 23)



    return (
        <section className="container  mt-4">
            <button
                className="btn btn-secondary mb-4"
                onClick={handleGoBack}
                alt="Go to home Admin"
                title="Go to home Admin"
            >Page précédente</button>

            {emission && attribute ? (
                <div className="row">
                    <div className="boxImg col-md-6">
                        <img
                            src={emission.imageURLs[0]}
                            alt={`Image ${emission.name}`}
                            title={`Image ${emission.name}`}
                            className="img-fluid img-thumbnail imgBottle"
                        />
                    </div>
                    <div className="col-md-6 mt-5">
                        <h2 className="m-4">Winery : {emission.embeddedSeller.name}</h2>
                        <h3 className="text-primary">Wine title : {emission.name}</h3>
                        <p className="lead">Description : {emission.description}</p>
                        <p className="lead">Area Of production : {attribute[18].value}</p>
                        <p className="lead">Wine Macro Region : {selectedOptions[20]}</p>
                        <p className="lead">Country : {selectedOptions[19]}</p>
                        <p className="lead">Year Of Bottling : {attribute[15].value}</p>
                        <p className="lead">Type of Wine : {selectedOptions[21]}</p>
                        <p className="lead">Initial Quantity Of Unique Bottles In Emission : {attribute[1].value}</p>
                        <p className="lead">Quantity Bottles: {emission.inventory.quantity}</p>
                        <p className="lead">Emission Price Target : {attribute[10].value}</p>
                        <p className="lead">Bottle Size : {selectedOptions[17]}</p>
                        <p className="lead">Emission Record Reference : {attribute[3].value}</p>
                        <p className="lead">ledger Of Emission Video Recording : {attribute[4].value}</p>
                        <p className="lead">Uniqueness Factor Type : {attribute[5].value}</p>
                        <p className="lead">Uniqueness Factor Description : {attribute[6].value}</p>
                        <p className="lead">Emission Status : {selectedOptions[2]}</p>
                        
                        <hr className="my-4" />
                        
                        <button
                            disabled={disable}
                            className="btn btn-warning ml-3"
                            onClick={handleSendToSOT}
                        >
                            Approve Emission - Send to Source-of-Truth
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



