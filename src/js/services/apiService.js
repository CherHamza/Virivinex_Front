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
     * @param {string} methodHttp protocole http (GET, POST, DELETE, PUT, PATCH)
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
     * Retourne toutes les émissions
     * @returns 
     */
    async getSotEmissionAll() {
        try {
            const response = await fetch(`${this.apiUrlSot}emissions`, this.init('GET'));
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error(`Erreur de récupération: ${response.statusText}`);
                return null;
            }
        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
            return null;
        }
    }

    async getLastRecord() {
        try {
            const allEmissions = await this.getSotEmissionAll();

            if (allEmissions) {
                // Tri par ordre décroissant de l'id 
                const sortedEmissions = allEmissions.sort((a, b) => b._id - a._id);

                if (sortedEmissions.length > 0) {
                    // Enregistrement le + récent
                    const latestRecord = sortedEmissions[0];
                    console.log('Dernier enregistrement :', latestRecord);

                    // id de l'enregistrement le + récent
                    console.log("Id du dernier enregistrement :", latestRecord._id);
                    return latestRecord;
                } else {
                    console.log('Aucun enregistrement trouvé.');
                }
            } else {
                console.log('Aucune émission trouvée.');
            }
            return null;
        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
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
                    console.log(`Champ mis à jour ${id}`);
                } else {
                    console.log(`Aucun ID ${id} introuvable.`);
                }

                return data;
            } else {
                console.error(`Erreur de récupération: ${response.statusText}`);
                return null;
            }
        } catch (error) {
            console.error('erreur :', error);
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
                // Access and store emissionUnique_id here
                // this.emissionUnique_id = data.emissionUnique_id;
                return data;
            } else {
                console.error( `Erreur de récupération: ${ response.statusText }`);
                return null;
            }
        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
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
                console.error(`Erreur de récupération: ${response.statusText}`);
                return null;
            }
        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
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
                console.error(`Erreur de récupération: ${response.statusText}`);
                return null;
            }
        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
            return null;
        }
    }


}
