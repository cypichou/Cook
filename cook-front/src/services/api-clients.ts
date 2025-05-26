import axios from "axios";
export const baseURLconst = "http://localhost:3000/";

export const apiClient = axios.create({
    baseURL: baseURLconst,
});


export default apiClient;
