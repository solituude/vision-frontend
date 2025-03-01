import Cookies from "universal-cookie";

import {companyStore} from "common/entities/company/model";

const cookie = new Cookies();
export const isFreePlanExpired = companyStore.isFreePlanExpired;
export const currPlan = (new Cookies).get("company-info")?.license;
export const isSub: boolean = !(isFreePlanExpired && currPlan === 1 || currPlan === null);
export const hasToken = cookie.get('token');