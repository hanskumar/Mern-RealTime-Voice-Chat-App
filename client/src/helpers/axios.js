import axios from "axios";
//const token = window.localStorage.getItem('token');

const baseURL= 'http://localhost:8080/api';

// Set config defaults when creating the instance
const axiosIntance = axios.create({
    baseURL,
    withCredentials: true,
    /* headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    } */
});


// send request to refresh access token after token expire automatically
axiosIntance.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            try {
                await axios.get(
                    `${baseURL}/refreshToken`,
                    {
                        withCredentials: true,
                    }
                );

                return axiosIntance.request(originalRequest);
            } catch (err) {
                console.log(err.message);
            }
        }
        throw error;
    }
);

export default axiosIntance;