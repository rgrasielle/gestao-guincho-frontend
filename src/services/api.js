import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
});

// interceptors para tratamento global de erros
api.interceptors.response.use(
    r => r,
    err => {
        console.error(err);
        return Promise.reject(err);
    }
);

export default api;
