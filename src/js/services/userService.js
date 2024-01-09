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

    /**
     * Logs in a user with the provided username and password.
     *
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     * @param {boolean} rememberMe - A flag indicating whether to remember the user's login or not.
     * @returns {Promise} - A promise that resolves to the logged in user's information.
     *
     * @example
     * login('user123', 'password123', true)
     *   .then(userInfo => {
     *     console.log(userInfo); // { id: '123', username: 'user123' }
     *   })
     *   .catch(error => {
     *     console.error(error);
     *   });
     */
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

    /**
     * @function logout
     * @async
     * @description Logs the user out from the system.
     * @returns {Promise} A promise that resolves when the user is successfully logged out.
     */
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