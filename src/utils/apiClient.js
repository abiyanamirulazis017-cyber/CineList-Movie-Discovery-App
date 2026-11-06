import axios from "axios";

// GANTI dengan URL API Laravel Anda
export const API_BASE_URL = 'http://127.0.0.1:8000/api'; 
export const API_TOKEN_LS_KEY = 'token';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// INTERCEPTOR: Menempelkan token secara otomatis ke setiap request
apiClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem(API_TOKEN_LS_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;