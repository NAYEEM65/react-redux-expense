import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://own-data-server.herokuapp.com/',
});

export default axiosInstance;
//https://lws-json-server-expense-tracke.herokuapp.com/
