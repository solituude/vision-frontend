import {staffArrayToRequest} from "company/pages/staffAddPage/lib/addStaffUtils";
import Cookies from "universal-cookie";

const registrationNewStaff = async (newStaffInfo) => {
    try {
        const staffFullInfo = staffArrayToRequest(newStaffInfo);
        console.log(staffFullInfo);
        const cookie = new Cookies();
        const companyId = cookie.get('company-info').id;
        const token = cookie.get('token');
        const response = await fetch(`/Users/companies/${companyId}`, {
            // mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(staffFullInfo),
            credentials: 'include'
        });
        if (response.ok) alert("Сотрудники добавлены");
        else alert("Ошибка при добавлении сотрудников")
        return response;
    } catch (error) {
        console.error(error);
        return;
    }
}

export const staffAddAPI = {
    registrationNewStaff
}