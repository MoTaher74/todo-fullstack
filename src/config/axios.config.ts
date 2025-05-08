import axios from "axios";


const axiosInstance = axios.create({
    baseURL:"http://localhost:1337/api",
    timeout: 10000,
    // headers:{}
});

export default axiosInstance