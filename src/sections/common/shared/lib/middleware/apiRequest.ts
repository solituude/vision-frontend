/**
 * Создание инстанса axios запроса для определения базовых настроек
 * Добавление интерсепторов на запрос и ответ бэка
 * */
import Cookies from "universal-cookie";
import axios from "axios";

import {requestLogout} from "common/shared/lib/middleware/logout";

const cookie = new Cookies();
export const api = axios.create({
    baseURL: "",
    headers: {
        post: {
            "Content-Type": "application/json"
        }
    },
    withCredentials: true
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${cookie.get('token')}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => {
        if (response.status === 500) {
            return Promise.reject(response);
        }
        return response;
    },
    (error) => {
        console.log(error);
        if (error.response?.status === 401) {
            requestLogout();
            // window.location.href = "/login";
        }
        return Promise.reject(error);
    }
)



