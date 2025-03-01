import Cookies from "universal-cookie";

export const staffArrayToRequest = (staff) => {
    const cookie = new Cookies();
    const companyId = cookie.get('company-info').id;
    for (const i in staff) {
        staff[i].companyId = companyId;
        staff[i].role = 'RegularUser'
        staff[i].position = 'Менеджер'; // должности в форме нет
        staff[i].phoneNumber = '+79678070949'; // номера телефона в форме нет
    }
    return staff;
}