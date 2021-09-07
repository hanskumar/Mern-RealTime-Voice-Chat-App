import axios from "axios";
const token = window.localStorage.getItem('token');


// Set config defaults when creating the instance
const axiosIntance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
});

export default axiosIntance;