import Cookies from "universal-cookie";
import {api} from "common/shared/lib/middleware";
import {authAPI} from "auth/shared/tools/api";

/**
 * Запрос на вход в систему
 *
 * @param loginInfo: {email: string, password: string} данные входа
 * */
const requestLogin = async (loginInfo) => {
    const cookies = new Cookies();
    authAPI.getXSRFToken();
    return await api.post('/Auth/login', loginInfo).then(res => {
        console.log(res)
        cookies.set('token', res.data.token, {path: '/'});
        cookies.set("user-info", res.data.userInfo, {path: '/'});
        return res;
    }).catch(error => {
        console.log(error, '<333');
        return error;
    });
}

export const loginAPI = {
    requestLogin
}