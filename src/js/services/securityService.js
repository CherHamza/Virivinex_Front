import { useNavigate } from 'react-router-dom';

class SecurityService {
    constructor() {
        this._isLogged = false;
        this._instance = null;
        // this._utilisateurService = UtilisateurService.getInstance();
        // this.securityObservable = SecurityObservable.getInstance();
        this.navigate = useNavigate();
    }

    static getInstance() {
        if (this._instance === null) {
            this._instance = new SecurityService();
        }
        return this._instance;
    }

    async login(email, password) {
        const credentials = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const responseData = response.json();
                console.log(responseData);
                this._isLogged = true;
                return responseData; // Retournez les données de l'utilisateur
            } else {
                this._isLogged = false;
                return null; // Retournez null en cas d'échec de connexion
            }
        } catch (error) {
            console.error('Erreur inattendue :', error);
            return null; // Retournez null en cas d'erreur
        }
    }

    get isLogged() {
        return this._isLogged;
    }

    set isLogged(value) {
        this._isLogged = value;
    }

    get utilisateurLogged() {
        return this._utilisateurLogged;
    }

    set utilisateurLogged(value) {
        this._utilisateurLogged = value;
    }

    get token() {
        return this._token;
    }

    set token(value) {
        this._token = value;
    }
}

export default SecurityService;
