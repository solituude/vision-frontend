import {CompanyInfoType} from "company/shared/types";
import {api} from "common/shared/lib/middleware";

/**
 * @param {CompanyInfoType} company информация о компании и контракторе
 * */
const registerCompany = async (company: CompanyInfoType) => {
    return api.post('/Companies/register', company).then(res => {
        console.log(res);
        return res;
    }).catch( error => {
        console.error("Ошибка в регистрации", error);
        return Promise.reject(error);
    });
}



export const registrationCompanyAPI = {
    registerCompany
}