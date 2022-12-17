import axios from "axios";
import localStoradgeService from "./localStoradge.service";
import config from "../config.json";

const httpAuth = axios.create({
    baseURL: config.apiEndPoint + "/auth/"
});

const authService = {
    register: async (payload) => {
        const { data } = await httpAuth.post(`signUp`, payload);
        return data;
    },
    login: async ({ email, password, ...rest }) => {
        const { data } = await httpAuth.post(`signInWithPassword`, {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post("token", {
            grant_type: "refresh_token",
            refresh_token: localStoradgeService.getRefreshKey()
        });
        return data;
    }
};

export default authService;
