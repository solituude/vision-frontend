import {useEffect, useState} from "react";

import {ROLES} from "common/entities/staff";
import {SortSelect} from "common/features/sortSelect";
import {useStore} from "common/shared/tools/incrumStore/store";
import { RoleSelect } from "common/features/roleSelect/ui/roleSelect";
import {staffStore} from "common/entities/staff/model";
import {Icon} from "common/shared/lib/icons/Icon";
import {SortType} from "common/entities/connections/model";

import {staffSearchServices as services, staffSearchStore as store} from "../model";

import s from './staffFilters.module.scss';

type RoleType = {
    user: boolean,
    admin: boolean,
    contractor: boolean
}
export const StaffFilters = () => {
    const [chooseRole, setChooseRole] = useState<RoleType>({user: false, admin: false, contractor: false});
    const [sortedBy, setSortedBy] = useState<SortType>("new-first");

    const [staffSearchStore, staffSearchServices] = useStore(store, services);
    const [staff] = useStore(staffStore);

    useEffect(() => {
        staffSearchServices.getFilteredStaff(staff);
    }, [staff, staffSearchServices, staffSearchStore.inputText])

    useEffect(() => {
        const roles: ROLES[] = [];
        chooseRole.user && roles.push(ROLES.USER);
        chooseRole.admin && roles.push(ROLES.ADMIN);
        chooseRole.contractor && roles.push(ROLES.CONTRACTOR);
        staffSearchStore.inputRole = roles;
        staffSearchServices.getFilteredStaff(staff);
    }, [chooseRole]);

    useEffect(() => {
        staffSearchStore.inputSortType = sortedBy;
        staffSearchServices.getFilteredStaff(staff);
    }, [sortedBy])

    return (
        <div className={s.filters__area}>
            <div className={s.input__container}>
                <Icon name={"search_24"} color={"--icon-secondary"} height={24} width={24}/>
                <input value={staffSearchStore.inputText}
                       onChange={(e) => staffSearchStore.inputText = e.target.value} placeholder={"Поиск..."}
                       className={s.input__area}/>
            </div>
            <div className={s.container}>
                <RoleSelect setRole={setChooseRole} role={chooseRole}/>
                <SortSelect key={"sort-select-staff-filters"} sortedBy={sortedBy} setSortedBy={setSortedBy}/>
            </div>
        </div>

    )
}
