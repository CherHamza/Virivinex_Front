export class ApiService {

    constructor() {
        this.apiUrl = "https://sotdb.verivinex.com/";
        this.apiUrlSot = "https://sotdb.verivinex.com/source-of-truth/";
        this.token = 'YWRtaW46d2Vid2luZXJ5';
        this.headers = new Headers();
        this.headers.append('Authorization', `Basic ${this.token}`);
        this.instance = null;
        this.emissionUnique_id = null;
    }

    /**
     * 
     * @param {string} methodHttp 
     */
    init = (methodHttp) => ({
        method: methodHttp,
        headers: this.headers,
    })

    static instance = null;  

    static getInstance() {
        if (!this.instance) {
           this.instance = new ApiService();
        }
        return this.instance;
    }

    /**
     * Get All Emissions
     * @returns 
     */
    async getSotEmissionAll() {
        try {
            const response = await fetch(`${this.apiUrlSot}emissions`, this.init('GET'));
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error(`Error Retrieving: ${response.statusText}`);
                return null;
            }
        } catch (error) {
            console.error('Error :', error);
            return null;
        }
    }

/**
 * Retrieve LastRecord on the sot
 * @returns 
 */
    async getLastRecord() {
        try {
            const allEmissions = await this.getSotEmissionAll();

            if (allEmissions) {
                const sortedEmissions = allEmissions.sort((a, b) => b._id - a._id);

                if (sortedEmissions.length > 0) {
                    const latestRecord = sortedEmissions[0];
                    return latestRecord;
                } else {
                    console.log('No records found.');
                }
            } else {
                console.log('No emissions found.');
            }
            return null;
        } catch (error) {
            console.error('Error :', error);
            return null;
        }
    }

    async updateEmissionId(id, newEmissionId) {
        try {
            const response = await fetch(`${this.apiUrlSot}emissions/${id}`, {
                method: 'PATCH', 
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Basic ${this.token}`
                },
                body: JSON.stringify({ emissionUnique_id: newEmissionId })
            });

            if (response.ok) {
                const data = await response.json();

                if (data.nModified > 0) {
                   
                } else {
                    console.log(`Error ID ${id} no found.`);
                }

                return data;
            } else {
                console.error(`Error: ${response.statusText}`);
                return null;
            }
        } catch (error) {
            console.error('error :', error);
            return null;
        }
    }

    
    async setSotEmission(apiEmission) {
        try {
            const response = await fetch(`${this.apiUrlSot}emissions`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Basic ${this.token}`
                },
                body: JSON.stringify(apiEmission)
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error( `Error retrieving: ${ response.statusText }`);
                return null;
            }
        } catch (error) {
            console.error('Error :', error);
            return null;
        }
    }


    async setSotEmissionUniqueId(uniqueIdEmission) {
        try {
            const response = await fetch(`${this.apiUrlSot}emissions`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Basic ${this.token}`
                },
                body: JSON.stringify(uniqueIdEmission)
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error(`Error retrieving: ${response.statusText}`);
                return null;
            }
        } catch (error) {
            console.error('Error :', error);
            return null;
        }
    }

    async getSotEmissionById(idEmissionSot) {
        try {
            const response = await fetch(`${this.apiUrlSot}emissions/${idEmissionSot}`, this.init('GET') );
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error(`Error retrieving: ${response.statusText}`);
                return null;
            }
        } catch (error) {
            console.error('Error :', error);
            return null;
        }
    }

    async createBottlesEmissionSot(bottle) {
        try {
            const response = await fetch(`${this.apiUrlSot}bottles`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${this.token}`
                },
                body: JSON.stringify(bottle)
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error(`Error create bottles : ${response.statusText}`);
                return null;
            }
        } catch (error) {
            console.error('Error :', error);
            return null;
        }
    }


    async getBottlesEmissionSot() {
        try {
            const response = await fetch(`${this.apiUrlSot}bottles`, this.init('GET'));
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error(`Error retrieving: ${response.statusText}`);
                return null;
            }
        } catch (error) {
            console.error('Error :', error);
            return null;
        }
    }

}
