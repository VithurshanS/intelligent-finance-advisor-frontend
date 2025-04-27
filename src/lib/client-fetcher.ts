import axios from "axios";

// Axios Interceptor Instance
const AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true  // This ensures cookies are sent with every request
});

// Request Interceptor
AxiosInstance.interceptors.request.use(
    async (config) => {
        // No need to manually add token as it's automatically sent via cookies
        return config;
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

// Axios Interceptor: Response Method
AxiosInstance.interceptors.response.use(
    (response) => {
        // Can be modified response
        return response;
    },
    (error) => {
        // Handle response errors here
        return Promise.reject(error);
    }
);

export default AxiosInstance;