import {StaffSearchType} from "../types";

import {ROLES} from "common/entities/staff";


export const staffSearchServices = (store: StaffSearchType) => ({
    getFilteredStaff: (staff) => {
        const inputText = store.inputText.toLowerCase();
        const roles: ROLES[] = store.inputRole;
        const sort = store.inputSortType;
        const filtered = staff.staff?.
        filter((user) => {
                const firstName = user.firstName.toLowerCase();
                const secondName = user.surName.toLowerCase();
                return (firstName.includes(inputText) || secondName.includes(inputText) ||
                    (firstName + " " + secondName).includes(inputText) || (secondName + " " + firstName).includes(inputText))
            }
        ).filter((user) => roles.length === 0 ? true : roles.toString().includes(user.role));

        sort === "alphabetically" && filtered.sort((a, b) => a.surName.localeCompare(b.surName));
        sort === "non-alphabetically" && filtered.sort((a, b) => b.surName.localeCompare(a.surName));
        // sort === "old-first" && filtered.sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());
        // sort === "new-first" && filtered.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

        staff.currStaff = filtered;
    }
})