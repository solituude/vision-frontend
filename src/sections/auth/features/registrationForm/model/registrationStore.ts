import {buildStore} from "common/shared/tools/incrumStore/store";

const initialState = {
    name: '',
    industry: "",
    companySize: "",
    contractor: {
        email: '',
        password: '',
        firstName: '',
        surName: '',
        patronymic: '',
        position: '',
        phoneNumber: ''
    },
}

export const registrationStore = buildStore(initialState);