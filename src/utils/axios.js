import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://data-server-yk0y.onrender.com/',
});

export default axiosInstance;
