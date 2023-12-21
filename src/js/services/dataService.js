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

    async createUser(seller,eventType,endpoint){
        await this.fetchMSM("sellerRegistrationServiceImpl", "PROTOTYPE", "registerSeller", [
            seller
        ], eventType, endpoint).then(res => res.result);
    }

}
export const dataService = new DataService();