export class ApiService {

    constructor() {
        this.apiUrl = "https://sotdb.verivinex.com/";
        this.apiUrlSot = "https://sotdb.verivinex.com/source-of-truth/";
        this.token = 'YWRtaW46d2Vid2luZXJ5';
        this.headers = new Headers();
        this.headers.append('Authorization', `Basic ${this.token}`);
        this.instance = null;
    }

    /**
     * 
     * @param {string} methodHttp protocole http (GET, POST, DELETE, PUT, PATCH)
     */
    unit = (methodHttp) => ({
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
            const response = await fetch(`${this.apiUrlSot}emissions`, this.unit('GET'));
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
                console.error(`Erreur de récupération: ${response.statusText}`);
                return null;
            }
        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
            return null;
        }
    }
}
