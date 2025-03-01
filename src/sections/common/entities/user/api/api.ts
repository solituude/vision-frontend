import Cookies from "universal-cookie";
import {api} from "common/shared/lib/middleware";


const cookie = new Cookies();

const getCompanyInfo = async () => {
    const Cookie = new Cookies();
    await api.get('/Users/company').then(res => {
        console.log(res);
        Cookie.set('company-info', JSON.stringify(res.data), {path: '/'});
    }).catch(error => {
        console.log(error);
    });
}

const registrationUsers = async (newUsers) => {
    const companyId = cookie.get('company-info').id;
    return await api.post(`/Users/companies/${companyId}`, newUsers);
}

const getAllUsers = async () => {
    const companyId = cookie.get('company-info').id;
    return await api.get(`/Users/companies/${companyId}`);
}

export const userAPI = {
    getCompanyInfo,
    registrationUsers,
    getAllUsers
}