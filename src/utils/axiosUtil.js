import axios from "axios";

const axiosInstance = axios.create({
//  baseURL: "http://localhost:5000", // localhost
 baseURL: "https://wikistrings-backend.adaptable.app/", // hosted
});

export default axiosInstance;
