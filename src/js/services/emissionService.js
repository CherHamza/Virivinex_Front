import { dataService } from "./dataService";

class EmissionService {
    constructor() {
    }

    //Retrieve allEmissions
    getAllEmissions = async () => {
        try {
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
            console.log("storeEmission:", storeEmission);
            return storeEmission.data.content;
        } catch (e) {
            console.error("erreur fetching:", e);
            throw e; 
        }
    };

    //Retrieve Emission by id
    getEmissionById = async (id) => {
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

            return result.data.content;
        } catch (e) {
            console.error("erreur fetching:", e);
            throw e; 
        }
    };


}

export const emissionService = new EmissionService();
