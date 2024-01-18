class DataService {

    MSM2App = new MSM2.App();

    fetchMSM(beanId,scope,functionName,args,eventType,endpoint) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.MSM2App.invokeAndGetJson$(beanId,scope,functionName,args,null,eventType,endpoint).subscribe(function(e) {
                    resolve(e);
                });
            }, 0);
        });
    }

    /**
     * Retrieves the value of a cookie based on its name.
     *
     * @param {string} cname - The name of the cookie.
     * @returns {string|null} The value of the cookie. Returns null if the cookie does not exist.
     */
    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    /**
     * Sets a cookie with the specified name and value.
     *
     * @param {string} name - The name of the cookie to set.
     * @param {string} value - The value to set for the cookie.
     * @param {Date|null} [expires=null] - The expiration date of the cookie (optional).
     * @param {string|null} [domain=null] - The domain for the cookie (optional).
     * @param {string|null} [path=null] - The path for the cookie (optional).
     * @returns {void}
     */
    setCookie(name, value, expires = null, domain = null, path = null) {
        const cookie = [
            `${name}=${value}`,
            expires != null ? `expires=${expires}` : ``,
            domain  != null ? `domain=${domain}`   : ``,
            path    != null ? `path=${path}`       : ``
        ].filter(s => s.length > 0).join('; ');
        document.cookie = cookie;
    }

    /**
     * Retrieves a language-aware URL based on the provided URL.
     *
     * @param {string} url - The URL to retrieve the language-aware URL from.
     *
     * @returns {Promise<string>} The language-aware URL.
     */
    async languageAwareUrl(url) {
        let detect = await this.getLanguageDetection();
        if(!detect && this.isNotSPA(url)){
            let lang = this.getCookie("i18next") ? this.getCookie("i18next") :
                sessionStorage.getItem("msmLang");
            return `/${lang}${url}`
        } else {
            return url
        }
    }

    /**
     * Checks if the given URL is not a Single Page Application (SPA).
     *
     * @param {string} url - The URL to be checked.
     * @returns {boolean} - True if the URL is not a SPA, false otherwise.
     */
    isNotSPA(url){
        return !url.match(/^(\/app\/.*|\/user\/.*|\/admin\/.*)/);
    }

    /**
     * Creates a user with the specified seller, eventType, and endpoint.
     *
     * @example
     * Seller object example:
     *{
     *     address: {
     *          houseNumber: "12",
     *          city: "Paris",
     *          street: "Champs-Élysées",
     *          postalCode: "75008",
     *          country: {
     *               code: "FR",
     *               name: "France",
     *               language: "Français"
     *          }
     *     },
     *     companyName: "John Snow",
     *     profiles: [
     *          {
     *                firstName: "John",
     *                lastName: "Snow",
     *                phone: "+3312345678",
     *                mobilePhone: "",
     *                emailAddress: "email@email.com",
     *                emailNotifications: false,
     *                salutation: "Mr",
     *                user: {
     *                     username: "email@email.com",
     *                     password: "12345"
     *                },
     *                metaInfo: {}
     *          }
     *     ]
     *}
     * @param {object} user - The user object
     * @param eventType - Optional parameter, it used to manage with server responses, possible values GLOBAL,USER,SHARED
     * @param endpoint - Optional parameter, it works if eventType is equals to SHARED
     * @returns {Promise} A Promise that resolves after the user is created.
     */
    async createUser(user,eventType,endpoint){
        await this.fetchMSM(
            "sellerRegistrationServiceImpl",
            "PROTOTYPE",
            "registerSeller",
            [user],
            eventType,

            endpoint).then( res => res.result );

    }

    /**
     * This function gets registered users
     *
     * @param request{{ query: {}, visiblePages: 10, sortName: "id", sortDirection: "ASC", limit: 10, offset: 0, page: 1 }} - this is request object
     * @param eventType - Optional parameter, it used to manage with server responses, possible values GLOBAL,USER,SHARED.
     * @param endpoint - Optional parameter, it works if eventType is equals to SHARED.
     * @returns {Promise<unknown>} all registered accounts
     */
    async getUsers(request,eventType,endpoint) {
        let queryRequest = request ? request : { query : {} };

        return await this.fetchMSM(
            "customerServiceImpl",
            "PROTOTYPE",
            "searchCustomers",
            [queryRequest],
            eventType,
            endpoint).then(res => res.result);
    }

    /**
     * Retrieves current website settings.
     * @param {string} eventType - The type of event. Optional parameter, it used to manage with server responses, possible values GLOBAL,USER,SHARED.
     * @param {string} endpoint - The API endpoint for retrieving the website settings. Optional parameter, it works if eventType is equals to SHARED.
     * @returns {Promise} - A promise that resolves with the website settings or rejects with an error.
     */
    async getWebSiteSettings(eventType,endpoint) {
        return await this.fetchMSM(
            "frameworkOperationServiceImpl",
            "PROTOTYPE",
            "getCurrentWebSiteSettings",
            [],
            eventType,
            endpoint).then( res => res.result );
    }

    /**
     * Retrieves the language detection.
     * @param {string} eventType - The type of event. Optional parameter, it used to manage with server responses, possible values GLOBAL,USER,SHARED.
     * @param {string} endpoint - The API endpoint for retrieving the website settings. Optional parameter, it works if eventType is equals to SHARED.
     * @returns {Promise} - A promise that resolves with the language detection result.
     */
    async getLanguageDetection(eventType,endpoint) {
        return await this.fetchMSM(
            "frameworkOperationServiceImpl",
            "PROTOTYPE",
            "isLanguageDetection",
            [],
            eventType,
            endpoint).then( res => res.result );
    }

    /**
     * Checks if the user is authenticated.
     * @returns {Promise<boolean>} - A promise that resolves to a boolean value indicating if the user is authenticated.
     */
    async isAuthenticated() {
        return await this.fetchMSM(
            "sellerRegistrationServiceImpl",
            "PROTOTYPE",
            "isLogged",
            []).then( res => res.result);
    }

    /**
     * Retrieves the authenticated user's profile.
     * @returns {Promise<Object>} A Promise that resolves to an object containing the authenticated user's profile.
     * The profile object includes properties such as name, email, and username.
     * The Promise is rejected with an error if there is an issue with authentication or retrieving the profile.
     *
     */
    async getAuthenticatedProfile() {
        return await this.fetchMSM(
            "sellerRegistrationServiceImpl",
            "PROTOTYPE",
            "getLoggedProfile",
            []).then( res => res.result );
    }

    /**
     * Retrieves special features based on the sellerSkuId, eventType, and endpoint.
     * @async
     * @param {string} sellerSkuId - The unique identifier of the seller SKU.
     * @param {string} eventType - The type of event. Optional parameter, it used to manage with server responses, possible values GLOBAL,USER,SHARED.
     * @param {string} endpoint - The API endpoint for retrieving the website settings. Optional parameter, it works if eventType is equals to SHARED.
     * @returns {Promise<Array>} - A promise that resolves to an array of special features.
     */
    async getSpecialFeatures(sellerSkuId,eventType,endpoint) {
        return await this.fetchMSM(
            "ecomSearchEngineServiceImpl",
            "PROTOTYPE",
            "getAttributeValuesByAreaUsageType",
            [sellerSkuId, 'SPECIAL_FEATURES'],
            eventType,
            endpoint).then( res => res.result );
    }


    /**
     * Retrieves commercial information for a specific seller SKU, based on the provided event type and endpoint.
     * @param {string} sellerSkuId - The unique identifier for the seller SKU.
     * @param {string} eventType - The type of event. Optional parameter, it used to manage with server responses, possible values GLOBAL,USER,SHARED.
     * @param {string} endpoint - The API endpoint for retrieving the website settings. Optional parameter, it works if eventType is equals to SHARED.
     * @returns {Promise<Object>} - A Promise that resolves to an object containing the commercial information.
     */
    async getCommercialInfo(sellerSkuId,eventType,endpoint) {
        return await this.fetchMSM(
            "ecomSearchEngineServiceImpl",
            "PROTOTYPE",
            "getAttributeValuesByAreaUsageType",
            [sellerSkuId, 'COMMERCIAL_INFO'],
            eventType,
            endpoint).then( res => res.result );
    }

    /**
     * Retrieves related data for a product based on seller's SKU ID.
     *
     * @async
     * @param {string} sellerSkuId - The unique identifier of the product's seller SKU.
     * @param {string} eventType - The type of event. Optional parameter, it used to manage with server responses, possible values GLOBAL,USER,SHARED.
     * @param {string} endpoint - The API endpoint for retrieving the website settings. Optional parameter, it works if eventType is equals to SHARED.
     * @returns {Promise} A promise that resolves to the related data of the product.
     */
    async getProductRelatedData(sellerSkuId,eventType,endpoint) {
        return await this.fetchMSM(
            "ecomSearchEngineServiceImpl",
            "PROTOTYPE",
            "getAttributeValuesByAreaUsageType",
            [sellerSkuId, 'PRODUCT_RELATED_DATA'],
            eventType,
            endpoint).then( res => res.result );
    }

    /**
     * Saves the emission as a draft.
     * @async
     * @param {object} emission - The emission object.
     * @param {string} eventType - The type of event. Optional parameter, it used to manage with server responses, possible values GLOBAL,USER,SHARED.
     * @param {string} endpoint - The API endpoint for retrieving the website settings. Optional parameter, it works if eventType is equals to SHARED.
     * @returns {Promise} A promise that resolves when the emission is saved as a draft.
     */
    async saveEmissionAsDraft(emission,eventType,endpoint) {
        return await this.fetchMSM(
            "salesCatalogServiceImpl",
            "PROTOTYPE",
            "saveSellerSkuAsDraft",
            [emission],
            eventType,
            endpoint
        ).then( res => res.result );
    }

    /**
* Retrieves listings based on request.
*
* @async
* @param request{{ query: {}, visiblePages: 10, sortName: "id", sortDirection: "ASC", limit: 10, offset: 0, page: 1 }} - this is request object
* @param {string} eventType - The type of event. Optional parameter, it used to manage with server responses, possible values GLOBAL,USER,SHARED.
* @param {string} endpoint - The API endpoint for retrieving the website settings. Optional parameter, it works if eventType is equals to SHARED.
* @returns {Promise} A promise that resolves to the related data of the product.
*/
    async searchEmissions(request, eventType, endpoint) {
        let queryRequest = request ? request : { query: {} };
        queryRequest["type"] = "SellerSKU";
        return await this.fetchMSM(
            "searchManagerServiceImpl",
            "PROTOTYPE",
            "search",
            [queryRequest],
            eventType,
            endpoint).then(res => res.result);
    }


    /**
     * Retrieves the SKU based on the specified query, event type, and endpoint.
     *
     * @param request{{ query: {}, visiblePages: 10, sortName: "id", sortDirection: "ASC", limit: 10, offset: 0, page: 1 }} - this is request object
     * @param {string} eventType - The type of event triggered for the SKU.
     * @param {string} endpoint - The endpoint used to retrieve the SKU.
     * @returns {Promise<string|null>} - A promise that resolves with the SKU if found, or null if not found.
     *
     */
    async getSKU(request,eventType,endpoint) {
        let queryRequest = request ? request : { query : {} };
        return await this.fetchMSM(
            "SKUServiceImpl",
            "PROTOTYPE",
            "searchSKUs",
            [queryRequest],
            eventType,
            endpoint).then( res => res.result?.data?.content?.length > 0 ? res.result?.data?.content[0] : null );
    }

    /**
     * Retrieves the SKU's based on the specified query, event type, and endpoint.
     *
     * @param request{{ query: {}, visiblePages: 10, sortName: "id", sortDirection: "ASC", limit: 10, offset: 0, page: 1 }} - this is request object
     * @param {string} eventType - The type of event triggered for the SKU.
     * @param {string} endpoint - The endpoint used to retrieve the SKU.
     * @returns {Promise<string|null>} - A promise that resolves with the SKU if found, or null if not found.
     *
     */
    async getSkus(request,eventType,endpoint) {
        let queryRequest = request ? request : { query : {} };
        return await this.fetchMSM(
            "SKUServiceImpl",
            "PROTOTYPE",
            "searchSKUs",
            [queryRequest],
            eventType,
            endpoint).then( res => res.result );
    }

}
export const dataService = new DataService();