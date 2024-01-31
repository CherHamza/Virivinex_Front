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
     * @param {string} methodHttp http protocole (GET, POST, DELETE, PUT, PATCH)
     */
    unit = (methodHttp) => ({
        method: methodHttp,
        headers: this.headers,
    })


    static getInstance() {
        if (!this.instance) {
           this.instance = new ApiService();
        }
        return this.instance;
    }

    /**
     * Return allEmissions
     * @returns 
     */
    async getSotEmissionAll() {
        try {
            const response = await fetch(`${this.apiUrlSot}emissions`, this.unit('GET'));
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error(`Error fetching: ${response.statusText}`);
                return null;
            }
        } catch (error) {
            console.error('An error occurred:', error);
            return null;
        }
    }
}
