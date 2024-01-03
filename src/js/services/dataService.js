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


     * @param {object} user - The user object
     * @param eventType "Optional parameter, it used to manage with server responses, possible values GLOBAL,USER,SHARED"
     * @param endpoint "Optional parameter, it works if eventType is equals to SHARED"
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
     * @param request{{ query: {}, visiblePages: 10, sortName: "id", sortDirection: "ASC", limit: 10, offset: 0, page: 1 }} this is request object
     * @param eventType "Optional parameter, it used to manage with server responses, possible values GLOBAL,USER,SHARED"
     * @param endpoint "Optional parameter, it works if eventType is equals to SHARED"
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


    async getOneUser(user, eventType, endpoint) {
        let queryRequest = request ? request : { query: {} };
        return await this.fetchMSM(
            "customerServiceImpl",
            "PROTOTYPE",
            "searchCustomers",
            [user],
            eventType,
            endpoint).then(res => res.result);

           
    }

}
export const dataService = new DataService();