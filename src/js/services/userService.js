import {dataService} from "./dataService";

class UserService {

    MSM2AuthHelper = MSM2.App.AuthHelper;
    loginPage = "/";
    userAccountPage = "/";

    constructor() {
        this.loginPage = dataService.getWebSiteSettings().then((res) => res?.hasOwnProperty("loginPage") && res?.loginPage ?
            dataService.languageAwareUrl(res.loginPage) : "/");
        this.userAccountPage = dataService.getWebSiteSettings().then((res) => res?.hasOwnProperty("userAccountPage") && res?.userAccountPage ?
            dataService.languageAwareUrl(res.userAccountPage) : "/");
    }

    async login(username, password, rememberMe) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.MSM2AuthHelper.authenticate$(
                    "/api/v1/authenticate",
                    `username=${username}&password=${password}&remember-me-user=${rememberMe}`
                ).subscribe(async (res) => {
                    resolve(res);
                });
            }, 0);
        });
    }

    async logout() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.MSM2AuthHelper.logout$("/api/v1/logout",`role=user`).subscribe(async (res) => {
                    resolve(res);
                });
            }, 0);
        });
    }

}
export const userService = new UserService();