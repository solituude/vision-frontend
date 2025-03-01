import {CompanyStoreType} from "common/entities/company/model/types";
import {checkFirstLogin} from "common/entities/company/model/helper";
import {buildStore} from "common/shared/tools/incrumStore/store";
/**
* Состояние информации о тарифах компании
 * @param {boolean} isFirstLogin        проверка на первый вход контрагента в систему
 * @param {boolean} isFreePlanExpired   истек ли пробный период
 * @param {number} currPlan             айди текущего плана
 *
 * @param {boolean} isFetching          флаг получения данных
 * */

const initialState: CompanyStoreType = {
    isFirstLogin: checkFirstLogin(),
    isFreePlanExpired: false,
    currPlan: null,

    isFetching: false,
}

export const companyStore = buildStore(initialState);