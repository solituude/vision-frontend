import Cookies from "universal-cookie";
import {URL} from "app/lib";
import {api} from "common/shared/lib/middleware";
import {XMLRequest} from "common/shared/tools/dataset/XMLRequest";

const requestLicenses = async () => {
    return await api.get('/Licenses');
}

const addLicenseRequest = async (licenseId: string) => {
    const companyId = (new Cookies).get("company-info").id;
    console.log(URL)
    return await api.post(`/Companies/${companyId}/add-license`, licenseId);
}

export const licensesDatasource = {
    address: `${URL}/Licenses`,
    payload: {},
    middleware: [],
    onSuccess: [],
    onError: [],
    fetchDriver: XMLRequest.get,
    gc: false,
}



export const licensesAPI = {
    requestLicenses,
    addLicenseRequest
}