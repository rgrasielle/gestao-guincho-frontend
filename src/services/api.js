import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor de requisição: adiciona o token automaticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor de resposta: tratamento global de erros
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);

export default api;
