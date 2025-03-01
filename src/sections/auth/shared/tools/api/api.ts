import {api} from "common/shared/lib/middleware";


/**
 * Запрос на получение XSRFToken
 * */
const getXSRFToken = async () => {
    await api.get('/Auth/get-xsrf-token').then(res => console.log(res));
}

export const authAPI = {
    getXSRFToken
}