import axios from "axios";
export const baseURLconst = "https://cook-production-c2c7.up.railway.app/";

export const apiClient = axios.create({
    baseURL: baseURLconst,
});


export default apiClient;
