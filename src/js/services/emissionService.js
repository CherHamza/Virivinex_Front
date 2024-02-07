import { dataService } from "./dataService";

 export class EmissionService {
    constructor() {
        this.instance = null
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new EmissionService();
        }
        return this.instance;
    }


    //Retrieve allEmissions
    async getAllEmissions(){
        try {
            let request = {
                type: "SellerSku",
                ignoreRegexWrap: [],
                query: {},
                visiblePages: 10,
                sortName: "id",
                sortDirection: "ASC",
                limit: 20,
                offset: 0,
                page: 1
            };
            const storeEmission = await dataService.searchEmissions(request);
            // console.log("storeEmission:", storeEmission);
            return storeEmission.data.content;
        } catch (e) {
            console.error("erreur fetching:", e);
            throw e; 
        }
    };

    //Retrieve Emission by id
     async getEmissionById(id){
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
            // console.log('result : ', result);

            return result.data.content;
        } catch (e) {
            console.error("erreur fetching:", e);
            throw e; 
        }
    };

   /**
    * 
    * @param {string} search of the input
    * @returns 
    */
    async getSearchEmission(search) {
        try{
            let request = {
                type: "SellerSku",
                ignoreRegexWrap: [],
                query: {
                    $or: [
                        { "name": { $regex: search, $options: "i" } },
                        { "description": { $regex: search, $options: "i" } },
                    ],
                },
                visiblePages: 10,
                sortName: "id",
                sortDirection: "ASC",
                limit: 10,
                offset: 0,
                page: 1
            };
            // console.log("Search request:", request);

            const result = await dataService.searchEmissions(request);
            // console.log("Search results:", result);

            return result.data.content
        } catch (error) {
            console.error("Erreur lors de la recherche d'émissions :", error);
        }
    }


}

// export const emissionService = new EmissionService();
